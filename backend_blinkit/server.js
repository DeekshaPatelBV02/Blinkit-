const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const RegisterModel = require("./models/register");
const ProductModel = require("./models/product");
const ServiceModel = require("./models/service");
const CategoryModel = require("./models/category");
const CartModel = require("./models/Cart");
const OrderModel = require("./models/order");

const { sendOtp } = require("./controllers/authController");
const { placeOrder } = require("./controllers/orderController");
const { status } = require("./controllers/statusController");

const upload = require("./middleware/upload");

const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/Images")));

/* ROOT ROUTE (IMPORTANT FOR DEPLOY) */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* MONGODB */
if (!process.env.MONGO_URL) {
  console.log("MONGO_URL missing");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* USERS */
app.post("/register", async (req, res) => {
  try {
    const user = await RegisterModel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await RegisterModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* OTP */
app.post("/sendOtp", sendOtp);

/* PRODUCTS */
app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPLOAD PRODUCT */
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const product = new ProductModel({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      file: req.file ? req.file.filename : null
    });

    await product.save();
    res.json({ message: "Product uploaded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* CATEGORIES */
app.get("/getCategories", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* SERVICES */
app.get("/getServices", async (req, res) => {
  try {
    const services = await ServiceModel.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* PRODUCTS BY CATEGORY */
app.get("/products/category/:category", async (req, res) => {
  try {
    const products = await ProductModel.find({
      category: req.params.category
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* SINGLE PRODUCT */
app.get("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* CART (single cart system as per your logic) */
app.post("/addCart", async (req, res) => {
  try {
    const { cart } = req.body;

    let existing = await CartModel.findOne();

    if (!existing) {
      const newCart = new CartModel({ product: cart });
      await newCart.save();
      return res.json(newCart);
    }

    existing.product = cart;
    await existing.save();

    res.json(existing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/getCart", async (req, res) => {
  try {
    const cart = await CartModel.findOne();
    res.json(cart || { product: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ORDERS */
app.get("/orders", async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/orders/add", placeOrder);

/* UPDATE STATUS */
app.put("/orders/:id", status);

/* DELETE ORDER */
app.delete("/orders/:id", async (req, res) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* RAZORPAY - CREATE ORDER */
app.post("/create-order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: "receipt#1",
      payment_capture: 1
    };

    const response = await razorpay.orders.create(options);

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* VERIFY PAYMENT */
app.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    res.json({ success: generated === razorpay_signature });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* SERVER */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});