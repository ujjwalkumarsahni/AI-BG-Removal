import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay';
import transactionModel from "../models/transactionModel.js";
import crypto from "crypto";

// api/user/webhooks
const clerkWebhook = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify signature
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { data, type } = req.body;

        const clerkId = data.id;
        const email = data.email_addresses?.[0]?.email_address || "";
        const firstName = data.first_name || "";
        const lastName = data.last_name || "";
        const photo = data.image_url || "";

        switch (type) {
            case 'user.created': {
                await userModel.create({
                    clerkId,
                    email,
                    firstName,
                    lastName,
                    photo,
                });
                break;
            }
            case 'user.updated': {
                await userModel.findOneAndUpdate(
                    { clerkId },
                    {
                        email,
                        firstName,
                        lastName,
                        photo,
                    },
                    { new: true }
                );
                break;
            }
            case 'user.deleted': {
                await userModel.findOneAndDelete({ clerkId });
                break;
            }
            default:
                break;
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        res.json({ success: false, message: error.message });
    }
};

// API controller function to get user available credit data
const userCredits = async (req, res) => {
    try {
        const clerkId = req.clerkId; // comes from middleware
        const userData = await userModel.findOne({ clerkId });

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, credits: userData.creditBalance });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Razorpay payment integration
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ Create Payment Order
const paymentRazorpay = async (req, res) => {
    try {
        const { clerkId, planId } = req.body;

        if (!clerkId || !planId) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const userData = await userModel.findOne({ clerkId });
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let credits, plan, amount;
        switch (planId) {
            case "Basic": plan = "Basic"; credits = 100; amount = 10; break;
            case "Advanced": plan = "Advanced"; credits = 500; amount = 50; break;
            case "Business": plan = "Business"; credits = 5000; amount = 250; break;
            default: return res.status(400).json({ success: false, message: "Invalid Plan" });
        }

        const newTransaction = await transactionModel.create({
            clerkId,
            plan,
            amount,
            credits
        });

        const order = await razorpayInstance.orders.create({
            amount: amount * 100,
            currency: process.env.CURRENCY || "INR",
            receipt: newTransaction._id.toString()
        });

        res.json({ success: true, order });
    } catch (error) {
        console.error("Payment error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Verify Payment
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Signature verification
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === "paid") {
            const transactionData = await transactionModel.findById(orderInfo.receipt);
            if (!transactionData) {
                return res.status(404).json({ success: false, message: "Transaction not found" });
            }

            if (transactionData.payment) {
                return res.json({ success: false, message: "Payment already processed" });
            }

            const userData = await userModel.findOne({ clerkId: transactionData.clerkId });
            if (!userData) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // ✅ Update user's credit balance
            const updatedBalance = (userData.creditBalance || 0) + transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id, { creditBalance: updatedBalance });

            // ✅ Mark transaction as paid
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

            return res.json({ success: true, message: "Credits added successfully", creditBalance: updatedBalance });
        }

        res.status(400).json({ success: false, message: "Payment not completed" });
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export { clerkWebhook,userCredits ,paymentRazorpay, verifyRazorpay };