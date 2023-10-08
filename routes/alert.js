import express from "express";
import * as alertTrigger from "../controller/alert.js"

const router = express.Router();


router.post('/trigger', alertTrigger.sendAlert);

export default router;