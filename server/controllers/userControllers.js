import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// api/user/webhooks
const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify the webhook signature (use raw body if available)
        const payload = req.rawBody || JSON.stringify(req.body);
        whook.verify(payload, {
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature'],
        });

        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: Array.isArray(data.email_addresses) ? data.email_addresses[0]?.email_address || "" : "",
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url || "",
                };

                await userModel.create(userData);
                res.json({ success: true });
                break;
            }

            case "user.updated": {
                const updatedData = {
                    email: Array.isArray(data.email_addresses) ? data.email_addresses[0]?.email_address || "" : "",
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url || "",
                };

                await userModel.findOneAndUpdate({ clerkId: data.id }, updatedData);
                res.json({ success: true });
                break;
            }

            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id });
                res.json({ success: true });
                break;
            }

            default:
                res.status(400).json({ success: false, message: "Unhandled event type" });
                break;
        }

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export { clerkWebhooks };
