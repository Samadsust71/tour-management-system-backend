import express from "express";
import { paymentController } from "./payment.controller";



const router = express.Router();


router.post("/init-payment/:bookingId", paymentController.initPayment);
router.post("/success", paymentController.successPayment);
router.post("/fail", paymentController.failPayment);
router.post("/cancel", paymentController.cancelPayment);
export const paymentRoutes = router;