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

const { sendOtp, verifyOtp } = require("./controllers/authController");
const { placeOrder } = require("./controllers/orderController");
const { status } = require("./controllers/statusController");

const upload = require("./middleware/upload");

const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();

/* MIDDLEWARE */
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/Images")));

/* ROOT ROUTE */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* MONGODB */
async function connectDB() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL missing");
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 30000
    });

    console.log("MongoDB Connected");
    console.log("DB Name:", mongoose.connection.name);
  } catch (err) {
    console.error("MongoDB ERROR:");
    console.error(err);
    process.exit(1);
  }
}

connectDB();

/* USERS */
app.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: "Fill all fields" });
    }

    const existingEmail = await RegisterModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingPhone = await RegisterModel.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    const user = await RegisterModel.create({
      name,
      phone,
      email,
      password
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user
    });
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Registration Failed"
    });
  }
});

/* GET ALL USERS */
app.get("/users", async (req, res) => {
  try {
    const users = await RegisterModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET SINGLE USER */
app.get("/users/:id", async (req, res) => {
  try {
    const user = await RegisterModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE USER */
app.put("/users/:id", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const updatedUser = await RegisterModel.findByIdAndUpdate(
      req.params.id,
      { name, phone, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (err) {
    console.log("UPDATE USER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* DELETE USER */
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await RegisterModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log("DELETE USER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* OTP */
app.post("/sendOtp", sendOtp);
app.post("/verifyOtp", verifyOtp);

app.post("/getUserByMobile", async (req, res) => {
  try {
    const { mobile } = req.body;

    const user = await RegisterModel.findOne({ phone: mobile });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ADD PRODUCT */
app.post("/upload", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const newProduct = new ProductModel({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      rating: req.body.rating,
      imageUrl: req.body.imageUrl,
    });

    await newProduct.save();

    res.json({ message: "Product added successfully" });

  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* GET ALL PRODUCTS */
app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    console.log("Get products error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* GET SINGLE PRODUCT */
app.get("/products/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.log("Get single product error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* GET PRODUCTS BY CATEGORY */
app.get("/products/category/:category", async (req, res) => {
  try {
    const products = await ProductModel.find({
      category: req.params.category
    });

    res.json(products);
  } catch (err) {
    console.log("Category products error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE PRODUCT */
app.put("/products/:id", async (req, res) => {
  try {
    const { name, price, category, description,imageUrl } = req.body;

    await ProductModel.findByIdAndUpdate(req.params.id, {
      name,
      price,
      category,
      description,
      imageUrl,
    });

    res.json({ message: "Product updated" });

  } catch (err) {
    res.status(500).json({ error: "Cannot update product" });
  }
});
/* DELETE PRODUCT */
app.delete("/products/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Cannot delete product" });
  }
});

/* GET CATEGORIES */
app.get("/getCategories", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (err) {
    console.log("Get categories error:", err);
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



/* CART */
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
    const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

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
      currency: req.body.currency || "INR",
      receipt: "receipt_" + Date.now()
    };

    const response = await razorpay.orders.create(options);

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
    });
  } catch (err) {
    console.log("Create order error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* VERIFY PAYMENT */
app.post("/verify-payment", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const generated = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated === razorpay_signature) {
      return res.json({ success: true, message: "Payment verified" });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature"
      });
    }
  } catch (err) {
    console.log("Verify payment error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/profile/:mobile", async (req, res) => {
  try {
    const user = await RegisterModel.findOne({
      phone: req.params.mobile
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone
    });

  } catch (err) {
    console.log("PROFILE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/my-orders/:email", async (req, res) => {
  try {
    if (!req.params.email) {
      return res.status(400).json({ message: "Email required" });
    }

    const orders = await OrderModel.find({
      "user.email": req.params.email
    });

    res.json(orders);

  } catch (err) {
    console.log("MY ORDERS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/admin/orders-datewise", async (req, res) => {
  try {
    const data = await OrderModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(
      data.map((item) => ({
        label: item._id,
        dateOrders: item.orders
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/admin/orders-monthwise", async (req, res) => {
  try {
    const data = await OrderModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          orders: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json(
      data.map((item) => ({
        label: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
        monthOrders: item.orders
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/admin/orders-yearwise", async (req, res) => {
  try {
    const data = await OrderModel.aggregate([
      {
        $group: {
          _id: { $year: "$createdAt" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(
      data.map((item) => ({
        label: String(item._id),
        yearOrders: item.orders
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/admin/payment-wise", async (req, res) => {
  try {
    const data = await OrderModel.aggregate([
      {
        $group: {
          _id: "$user.payment",
          value: { $sum: 1 }
        }
      }
    ]);

    res.json(
      data.map((item) => ({
        name: item._id || "Unknown",
        value: item.value
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/admin/signup-wise", async (req, res) => {
  try {
    const data = await RegisterModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          signups: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(
      data.map((item) => ({
        label: item._id,
        signups: item.signups
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/admin/orders-count-chart", async (req, res) => {
  try {
    const data = await OrderModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(
      data.map((item) => ({
        label: item._id,
        orders: item.orders
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* SERVER */
const PORT = process.env.PORT || 3001;

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});