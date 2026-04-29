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

      const doc = new PDFDocument({ margin: 40 });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // Title
      doc.fontSize(22).text("ORDER INVOICE", { align: "center" });
      doc.moveDown();

      // Customer Details
      doc.fontSize(13).text("Customer Details", { underline: true });
      doc.moveDown(0.5);

      doc.fontSize(11);
      doc.text(`Order ID: ${orderId}`);
      doc.text(`Customer Name: ${orderData.user.fullName}`);
      doc.text(`Email: ${orderData.user.email}`);
      doc.text(`Phone: ${orderData.user.number}`);
      doc.text(`Address: ${orderData.user.address}`);
      doc.text(`Payment Method: ${orderData.user.payment}`);

      doc.moveDown();

      // Table Header
      doc.fontSize(13).text("Product Details", { underline: true });
      doc.moveDown(0.5);

      const tableTop = doc.y;
      const itemX = 40;
      const nameX = 80;
      const priceX = 280;
      const qtyX = 370;
      const totalX = 450;

      doc.fontSize(11).font("Helvetica-Bold");

      doc.text("No", itemX, tableTop);
      doc.text("Product", nameX, tableTop);
      doc.text("Price", priceX, tableTop);
      doc.text("Qty", qtyX, tableTop);
      doc.text("Total", totalX, tableTop);

      doc.moveTo(40, tableTop + 18)
        .lineTo(550, tableTop + 18)
        .stroke();

      doc.font("Helvetica");

      let y = tableTop + 30;

      orderData.products.forEach((item, index) => {
        const itemTotal = Number(item.price) * Number(item.quantity);

        doc.text(index + 1, itemX, y);
        doc.text(item.name, nameX, y, { width: 180 });
        doc.text(`Rs.${item.price}`, priceX, y);
        doc.text(item.quantity, qtyX, y);
        doc.text(`Rs.${itemTotal}`, totalX, y);

        y += 25;
      });

      doc.moveTo(40, y)
        .lineTo(550, y)
        .stroke();

      doc.moveDown(2);

      // GST Calculation
      const subtotal = Number(orderData.subtotal);
      const gstRate = Number(orderData.gstRate); // example 5
      const gstAmount = Number(orderData.gstAmount);

      const cgstRate = gstRate / 2;
      const sgstRate = gstRate / 2;

      const cgstAmount = gstAmount / 2;
      const sgstAmount = gstAmount / 2;

      // Summary Table
      let summaryY = y + 25;

      doc.fontSize(13).font("Helvetica-Bold").text("Bill Summary", 350, summaryY);
      summaryY += 25;

      doc.fontSize(11).font("Helvetica");

      doc.text("Total Items:", 350, summaryY);
      doc.text(orderData.totalItems, 470, summaryY);
      summaryY += 20;

      doc.text("Subtotal:", 350, summaryY);
      doc.text(`Rs.${subtotal}`, 470, summaryY);
      summaryY += 20;

      doc.text(`CGST (${cgstRate}%):`, 350, summaryY);
      doc.text(`Rs.${cgstAmount}`, 470, summaryY);
      summaryY += 20;

      doc.text(`SGST (${sgstRate}%):`, 350, summaryY);
      doc.text(`Rs.${sgstAmount}`, 470, summaryY);
      summaryY += 20;

      doc.font("Helvetica-Bold");
      doc.text("Total Price:", 350, summaryY);
      doc.text(`Rs.${orderData.totalPrice}`, 470, summaryY);

      doc.moveDown(4);

      doc.fontSize(12)
        .font("Helvetica-Bold")
        .text("Thank you for your order!", { align: "center" });

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generateInvoicePDF;