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

      const doc = new PDFDocument({ margin: 40, size: "A4" });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      const totalItems =
        orderData.totalItems ||
        orderData.products.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

      const subtotal = Number(orderData.subtotal || 0).toFixed(2);
      const gstAmount = Number(orderData.gstAmount || 0).toFixed(2);
      const totalPrice = Number(orderData.totalPrice || 0).toFixed(2);

      // Header
      doc
        .rect(40, 40, 515, 60)
        .stroke();

      doc
        .fontSize(22)
        .text("ORDER INVOICE", 40, 60, { align: "center" });

      doc.moveDown(3);

      // Order and customer details
      doc.fontSize(12).text(`Order ID: ${orderId}`, 50, 120);
      doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 350, 120);

      doc.moveDown();

      doc
        .fontSize(13)
        .text("Customer Details", 50, 155);

      doc
        .moveTo(50, 175)
        .lineTo(550, 175)
        .stroke();

      doc.fontSize(11);
      doc.text(`Name: ${orderData.user.fullName}`, 50, 185);
      doc.text(`Email: ${orderData.user.email}`, 50, 205);
      doc.text(`Phone: ${orderData.user.number}`, 50, 225);
      doc.text(`Address: ${orderData.user.address}`, 50, 245);
      doc.text(`Payment Method: ${orderData.user.payment}`, 50, 265);

      // Product table title
      doc
        .fontSize(13)
        .text("Product Details", 50, 305);

      doc
        .moveTo(50, 325)
        .lineTo(550, 325)
        .stroke();

      // Table header
      const tableTop = 340;
      doc.fontSize(11);
      doc.text("No", 50, tableTop);
      doc.text("Item", 90, tableTop);
      doc.text("Price", 280, tableTop);
      doc.text("Qty", 360, tableTop);
      doc.text("Total", 430, tableTop);

      doc
        .moveTo(50, tableTop + 15)
        .lineTo(550, tableTop + 15)
        .stroke();

      // Product rows
      let y = tableTop + 25;

      orderData.products.forEach((item, index) => {
        const itemTotal = Number(item.price) * Number(item.quantity);

        doc.text(String(index + 1), 50, y);
        doc.text(item.name, 90, y, { width: 160 });
        doc.text(`₹${Number(item.price).toFixed(2)}`, 280, y);
        doc.text(String(item.quantity), 360, y);
        doc.text(`₹${itemTotal.toFixed(2)}`, 430, y);

        y += 25;
      });

      // Summary box
      y += 20;

      doc
        .rect(320, y, 230, 95)
        .stroke();

      doc.fontSize(11);
      doc.text(`Total Items: ${totalItems}`, 335, y + 15);
      doc.text(`Subtotal: ₹${subtotal}`, 335, y + 35);
      doc.text(`GST (${orderData.gstRate}%): ₹${gstAmount}`, 335, y + 55);

      doc
        .fontSize(12)
        .text(`Total Price: ₹${totalPrice}`, 335, y + 75);

      // Footer
      doc
        .fontSize(12)
        .text("Thank you for your order!", 40, 730, { align: "center" });

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generateInvoicePDF;