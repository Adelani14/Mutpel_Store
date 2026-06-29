import express from "express";
import isAuth from "../middleware/isAuth.js";

import {
    signupUser,
    loginUser,
    getUsername,
    logoutUser,
    refreshToken,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);
router.get("/Username", isAuth, getUsername);

router.post("/logout", logoutUser);

router.post("/refresh-token", refreshToken);



export default router;