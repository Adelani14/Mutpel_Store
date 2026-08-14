import User from "../models/users.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import signUpEmail from "../services/signUpEmail.js"
import forgotPasswordEmail from "../services/forgotPasswordEmail.js"
import resetPasswordEmail from "../services/resetPasswordEmail.js"

import {
    CreateAccessToken,
    CreateRefreshToken
} from "../utils/token.js";



// SIGNUP
export const signupUser = async (req, res) => {

    const { email, password, firstname, lastname } = req.body;

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            firstname,
            lastname,
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully"
        });


        await signUpEmail(newUser);
    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }
};




// LOGIN
export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }



        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }



        const accessToken = CreateAccessToken(
            user._id,
            user.role
        );

        const refreshToken = CreateRefreshToken(
            user._id,
            user.role
        );



        user.refreshToken = refreshToken;

        await user.save();



        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        res.status(200).json({
            message: "Login successful",

            accessToken,

            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname,
                role: user.role,
            },
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
        });

    }
};




// LOGOUT
export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.refreshtoken;

        if (token) {
            const user = await User.findOne({ refreshToken: token });

            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        }

        res.clearCookie("refreshtoken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Logout successful",
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};




// REFRESH TOKEN
export const refreshToken = async (req, res) => {


    try {
        const token = req.cookies.refreshtoken;

        if (!token) {
            console.log("No refresh token cookie received");

            return res.status(401).json({
                message: "No refresh token",
            });
        }

        const payload = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET
        );


        const user = await User.findOne({
            _id: payload.userID,
            refreshToken: token,
        });

        if (!user) {

            return res.status(401).json({
                message: "Invalid refresh token",
            });
        }


        const accessToken = CreateAccessToken(
            user._id,
            user.role
        );

        return res.status(200).json({
            accessToken,
        });

    } catch (err) {

        console.log("Refresh Error:", err);

        return res.status(401).json({
            message: "Invalid refresh token",
        });
    }
};



// Collect user names

export const getUsername = async (req, res) => {
    try {
        const user = await User.findById(req.user.userID)
            .select("firstname lastname email role");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
                fullName: `${user.firstname} ${user.lastname}`,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// Forgot password

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });


        if (!user) {
            return res.status(200).json({
                message:
                    "No account found. Check your mobile number or email address and try again."
            });
        }

        // Generate random token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Hash token before saving to database
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;

        // Token expires in 15 minutes
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save();


        const resetUrl =
            `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // console.log("RESET URL:", resetUrl);
        await forgotPasswordEmail(user, resetUrl);

        return res.status(200).json({
            message:
                "check your email for the reset link."
        });

    } catch (error) {
        console.error("Forgot password error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};



// Reset password

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    try {

        if (!password || !confirmPassword) {
            return res.status(400).json({
                message: "Password and confirm password are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Hash token from URL
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        });

        if (!user) {
            return res.status(400).json({
                message: "Reset link is invalid or has expired"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        // Invalidate reset token
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();
        await resetPasswordEmail(user);

        return res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {

        console.error("Reset password error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};
