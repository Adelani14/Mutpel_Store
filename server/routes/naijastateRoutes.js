import express from "express";
import { getStates, getLGAs } from "../controllers/naijastateController.js";
import isAuth from "../middleware/isAuth.js";


const router = express.Router();

router.get("/states", isAuth, getStates);
router.get("/lgas/:state", isAuth, getLGAs);

export default router;  