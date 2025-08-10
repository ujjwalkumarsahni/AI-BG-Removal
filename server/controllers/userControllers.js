import { Webhook } from "svix";
import userModel from "../models/userModel.js";
// import razorpay from 'razorpay'

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
// const userCredits = async (req, res) => {
//     try {
//         const { clerkId } = req.body

//         const userData = await userModel.findOne({ clerkId })

//         res.json({ success: true, credits: userData.creditBalance })

//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }

// const razorpayInstance = new razorpay({
    
// })


export { clerkWebhook };