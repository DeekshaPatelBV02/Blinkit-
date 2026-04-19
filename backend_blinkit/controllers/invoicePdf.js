const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateInvoicePDF(orderData, orderId) {
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.join(__dirname, `invoice_${orderId}.pdf`);

      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // Title
      doc.fontSize(18).text("ORDER INVOICE", { align: "center" });
      doc.moveDown();

      // Customer details
      doc.fontSize(12);
      doc.text("Order ID: " + orderId);
      doc.text("Name: " + orderData.user.fullName);
      doc.text("Email: " + orderData.user.email);
      doc.text("Phone: " + orderData.user.number);
      doc.text("Address: " + orderData.user.address);
      doc.text("Payment: " + orderData.user.payment);

      doc.moveDown();

      // Products
      doc.text("Products:");
      orderData.products.forEach((item, index) => {
        const total = item.price * item.quantity;
        doc.text(
          `${index + 1}. ${item.name} - ${item.price} x ${item.quantity} = ${total}`
        );
      });

      doc.moveDown();

      // Totals (no ₹ and no decimals)
      const subtotal = Math.round(orderData.subtotal || 0);
      const gst = Math.round(orderData.gstAmount || 0);
      const total = Math.round(orderData.totalPrice || 0);

      doc.text("Subtotal: " + subtotal);
      doc.text("GST (" + orderData.gstRate + "%): " + gst);
      doc.text("Total: " + total);

      doc.moveDown();
      doc.text("Thank you for your order!", { align: "center" });

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = generateInvoicePDF;