"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = void 0;
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const pdfkit_1 = __importDefault(require("pdfkit"));
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const generatePdf = (invoiceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return new Promise((resolve, reject) => {
            const doc = new pdfkit_1.default({ size: "A4", margin: 50 });
            const buffer = [];
            doc.on("data", (chunk) => buffer.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(buffer)));
            doc.on("error", (err) => reject(err));
            // Header
            doc
                .fillColor("#333")
                .fontSize(26)
                .font("Helvetica-Bold")
                .text("Tour Management System", { align: "center" });
            doc
                .fontSize(12)
                .fillColor("gray")
                .text("Your adventure partner", { align: "center" });
            doc.moveDown(2);
            // Invoice Title
            doc
                .fontSize(20)
                .fillColor("#000")
                .font("Helvetica-Bold")
                .text("Booking Invoice", { align: "left" });
            doc
                .moveDown()
                .lineWidth(1)
                .strokeColor("#aaaaaa")
                .moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .stroke();
            doc.moveDown();
            // Transaction Info
            doc.font("Helvetica").fontSize(12).fillColor("#000");
            doc.text(`Transaction ID: ${invoiceData.transactionId}`);
            doc.text(`Booking Date: ${invoiceData.bookingDate.toDateString()}`);
            doc.text(`Customer Name: ${invoiceData.userName}`);
            doc.moveDown(2);
            // Tour Info Box (Draw first, then position content manually inside)
            const boxTop = doc.y;
            const boxHeight = 90;
            doc
                .rect(50, boxTop, 500, boxHeight)
                .fillOpacity(1)
                .fillAndStroke("#f9f9f9", "#cccccc");
            // Reset fill color for text
            doc
                .fillColor("#000")
                .fontSize(14)
                .font("Helvetica-Bold")
                .text("Tour Details", 60, boxTop + 10);
            doc
                .font("Helvetica")
                .fontSize(12)
                .text(`Tour Title: ${invoiceData.tourTitle}`, 60, boxTop + 30)
                .text(`Guest Count: ${invoiceData.guestCount}`, 60, boxTop + 50)
                .text(`Total Amount: ${invoiceData.totalAmount.toFixed(2)}Tk`, 60, boxTop + 70);
            doc.moveDown(4);
            // Footer Message
            doc
                .font("Helvetica-Oblique")
                .fontSize(12)
                .fillColor("#000")
                .text("Thank you for booking with us!", {
                align: "center",
            });
            doc
                .fontSize(10)
                .fillColor("blue")
                .text("Tour Management System | www.tmsystem.com | samadsust7@gmail.com", {
                align: "center",
            });
            doc.end();
        });
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.default(401, `Pdf creation error ${error.message}`);
    }
});
exports.generatePdf = generatePdf;
