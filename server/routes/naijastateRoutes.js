import express from "express";
import { getStates, getLGAs } from "../controllers/naijastateController.js";

const router = express.Router();

router.get("/states", getStates);
router.get("/lgas/:state", getLGAs);

export default router;  