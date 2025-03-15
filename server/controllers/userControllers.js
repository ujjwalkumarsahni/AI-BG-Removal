import { Webhook } from "svix";
import userModel from "../models/userModel.js";

const clerkWebhooks = async (req, res) => {
  try {
    // Clerk webhook sends raw JSON, so convert it to a string
    const payload = req.body.toString();

    console.log("🔹 Webhook received:", payload);

    // Webhook verification
    const whook = new Webhook(process.env.WEBHOOK_SECRET);

    try {
      whook.verify(payload, {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      });
    } catch (error) {
      console.error("❌ Webhook verification failed:", error);
      return res.status(400).json({ success: false, message: "Invalid webhook signature" });
    }

    const { data, type } = JSON.parse(payload);

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address || "",
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          photo: data.image_url || "",
        };

        await userModel.create(userData);
        console.log("✅ User created:", userData);
        res.json({ success: true });
        break;
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses[0]?.email_address || "",
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          photo: data.image_url || "",
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, updatedData, { new: true });
        console.log("✅ User updated:", updatedData);
        res.json({ success: true });
        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        console.log(`✅ User deleted: ${data.id}`);
        res.json({ success: true });
        break;
      }

      default:
        console.warn("⚠️ Unhandled webhook event:", type);
        res.status(400).json({ success: false, message: "Unhandled webhook event" });
    }
  } catch (error) {
    console.error("❌ Webhook error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { clerkWebhooks };
