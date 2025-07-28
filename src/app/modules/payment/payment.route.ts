import express from "express";
import { paymentController } from "./payment.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";



const router = express.Router();


router.post("/init-payment/:bookingId", paymentController.initPayment);
router.post("/success", paymentController.successPayment);
router.post("/fail", paymentController.failPayment);
router.post("/cancel", paymentController.cancelPayment);
router.get("/invoice/:paymentId", checkAuth(...Object.values(Role)), paymentController.getInvoiceDownloadUrl);
export const paymentRoutes = router;