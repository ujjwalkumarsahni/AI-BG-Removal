import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    const { userId } = req.body;

    if(!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const user = await userModel.findById(userId);

        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = {
            name: user.name,
            isAccountVerified: user.isAccountVerified,

        }

        return res.json({success: true, userData});

    } catch (error) {
        return res.json({success: false, error: error.message });
    }
}