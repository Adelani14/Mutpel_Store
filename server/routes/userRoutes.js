import express from "express";

import {
    signupUser,
    loginUser,
    logoutUser,
    refreshToken
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/refresh-token", refreshToken);

export default router;