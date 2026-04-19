const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateInvoicePDF(orderData, orderId) {
  return new Promise((resolve, reject) => {
    try {
      const invoicesDir = path.join(__dirname, "../invoices");

      if (!fs.existsSync(invoicesDir)) {
        fs.mkdirSync(invoicesDir, { recursive: true });
      }

      const fileName = `invoice_${orderId}_${Date.now()}.pdf`;
      const filePath = path.join(invoicesDir, fileName);

      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      doc.fontSize(20).text("ORDER INVOICE", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text(`Order ID: ${orderId}`);
      doc.text(`Customer Name: ${orderData.user.fullName}`);
      doc.text(`Email: ${orderData.user.email}`);
      doc.text(`Phone: ${orderData.user.number}`);
      doc.text(`Address: ${orderData.user.address}`);
      doc.text(`Payment Method: ${orderData.user.payment}`);
      doc.moveDown();

      doc.fontSize(14).text("Products");
      doc.moveDown(0.5);

      orderData.products.forEach((item, index) => {
        const itemTotal = Number(item.price) * Number(item.quantity);
        doc.text(
          `${index + 1}. ${item.name} - ₹${item.price} x ${item.quantity} = ₹${itemTotal}`
        );
      });

      doc.moveDown();
      doc.text(`Total Items: ${orderData.totalItems}`);
      doc.text(`Subtotal: ₹${orderData.subtotal}`);
      doc.text(`GST (${orderData.gstRate}%): ₹${orderData.gstAmount}`);
      doc.text(`Total Price: ₹${orderData.totalPrice}`);

      doc.moveDown();
      doc.text("Thank you for your order!", { align: "center" });

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generateInvoicePDF;