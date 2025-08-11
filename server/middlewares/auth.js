import jwt from 'jsonwebtoken';

// // Middleware function to decode jwt token to get clerkid

const authuser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }

        const token = authHeader.split(" ")[1];
        const token_decode = jwt.decode(token);

        // Clerk stores user id in `sub`, not `clerkId`
        req.clerkId = token_decode?.clerkId || token_decode?.sub;

        if (!req.clerkId) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }

        next();
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
export default authuser;
