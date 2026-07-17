import express from "express";
import {
    initializePayment,
    verifyPayment,
} from "../controllers/paymentController.js";

import  isAuth  from "../middleware/isAuth.js";

const router = express.Router();

router.post("/initialize", isAuth, initializePayment);

router.post("/verify", isAuth, verifyPayment);

export default router;