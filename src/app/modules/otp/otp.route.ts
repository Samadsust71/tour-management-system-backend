import express from "express";
import { otpController } from "./otp.controller";

const router = express.Router();

router.post("/send", otpController.sendOTP);
router.post("/verify", otpController.verifyOTP);

export const otpRoutes = router;