import express from "express";
import isAuth from "../middleware/isAuth.js";

import {
    signupUser,
    loginUser,
    getUsername,
    logoutUser,
    refreshToken,
    forgotPassword,
    resetPassword
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);
router.get("/Username", isAuth, getUsername);

router.post("/logout", logoutUser);

router.post("/refresh-token", refreshToken);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);



export default router;