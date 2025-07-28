/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from "pdfkit";
import AppError from "../errorHelpers/AppError";

export interface IInvoiceData {
  transactionId: string;
  bookingDate: Date;
  userName: string;
  tourTitle: string;
  guestCount: number;
  totalAmount: number;
}

export const generatePdf = async (
  invoiceData: IInvoiceData
): Promise<Buffer> => {
  try {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffer: Uint8Array[] = [];

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
        .text(
          "Tour Management System | www.tmsystem.com | samadsust7@gmail.com",
          {
            align: "center",
          }
        );

      doc.end();
    });
  } catch (error: any) {
    console.log(error);
    throw new AppError(401, `Pdf creation error ${error.message}`);
  }
};
