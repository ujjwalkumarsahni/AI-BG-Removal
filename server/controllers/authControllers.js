import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from './../models/userModel.js';
import transporter from '../config/nodeMailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/EmailTempletes.js';

// Register a new user
// POST /api/auth/register
export const register = async (req, res) => {
    
    // Destructuring the data from the request body
    const { name, email, password } = req.body;

    // Checking if any of the fields are empty
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Data missing" });
    }

    try {

        // Checking if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" }); 
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Creating a new user
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        // Generating the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Setting the token in the cookie
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        // });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,  // Always true for production (HTTPS)
            sameSite: "none", // Required for cross-origin cookies
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

        // Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to AI BG Removal",
            text: `your account has been created with email id: ${email}`
        }

        // Sending the email
        await transporter.sendMail(mailOptions)
        
        // Sending the response
        return res.json({ success: true, message: "User registered successfully" }); 

    } catch (error) {
        res.json({ success: false, message: error.message });
    }

};

// Login a user
// POST /api/auth/login
export const login = async (req, res) => {

    // Destructuring the data from the request body
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and Password are required" });
    }

    try {
        // Checking if the user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid email" });
        }

        // Checking if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        // Generating the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Setting the token in the cookie
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        // });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,  // Always true for production (HTTPS)
            sameSite: "none", // Required for cross-origin cookies
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
          

        // Sending the response
        return res.json({ success: true, message: "Login successful" }); 

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Logout a user
// POST /api/auth/logout
export const logout = async (req,res) =>{
    try {

        // Clearing the cookie
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        // Sending the response
        return res.json({success: true, message: "Logged out"})

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Send OTP for email verification
// POST /api/auth/send-verify-otp
export const sendVerifyOtp = async (req,res) => {
    try{
        const { userId } = req.body;
        
        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({success: false, message: "Account already verified"})
        }

        const otp = String(Math.floor(Math.random() * 900000 + 100000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account verification OTP",
            // text: `Your account verification OTP is ${otp}`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        }

        await transporter.sendMail(mailOptions);

        res.json({success: true, message: "OTP sent successfully"})

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
    
}

// Verify email using OTP
// POST /api/auth/verify-account
export const verifyEmail = async (req,res) => {
    const {userId, otp} = req.body;

    if(!userId || !otp){
        return res.json({success: false, message: "Data missing"})
    }

    try {
        const user = await userModel.findById(userId);

        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.json({success: false, message: "Invalid OTP"})
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success: false, message: "OTP expired"})
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        return res.json({success: true, message: "Account verified successfully"})
        
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Check if user is authenticated
// POST /api/auth/is-auth
export const isAuthenticated = async (req,res) => {
    try{
        res.json({success: true})
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Send OTP for password reset
// POST /api/auth/send-reset-otp
export const sendResetOtp = async (req,res) => {
    const {email} = req.body;

    if(!email){
        return res.json({success: false, message: "Email is required"})
    }

    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success: false, message: "User not found"})
        }

        const otp = String(Math.floor(Math.random() * 900000 + 100000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            // text: `Your otp for reseting your password is ${otp}`,
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "Reset OTP sent successfully"})


    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Reset password using OTP
// POST /api/auth/reset-password
export const resetPassword = async (req,res) => {
    const {email,otp,newPassword} = req.body

    if(!email || !otp || !newPassword){
        return res.json({success: false, message: "Data missing"})
    }

    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success: false, message: "User not found"})
        }

        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.json({success: false, message: "Invalid OTP"})
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success: false, message: "OTP expired"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = ''
        user.resetOtpExpireAt = 0;
        await user.save();

        return res.json({success: true, message: "Password reset successfully"})
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}