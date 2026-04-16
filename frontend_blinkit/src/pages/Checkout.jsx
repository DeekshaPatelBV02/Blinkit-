"use client";
import React, { useContext, useState } from "react";
import { CartContext } from "../Features/ContextProvider";
import { totalItem, totalPrice } from "../Features/CartReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/checkout.css";
import { sendEmail } from "../utils/sendEmail";

function Checkout() {
  const { cart = [], dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    number: "",
    email: "",
    address: "",
    payment: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Razorpay failed");
        return;
      }

      const { data } = await axios.post(
        "https://blinkit-2-yemv.onrender.com/create-order",
        {
          amount: totalPrice(cart) * 100,
          currency: "INR",
        }
      );

      const options = {
        key: "rzp_test_SYBkOch7KPkXkK",
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,

        handler: async (response) => {
  try {
    const verify = await axios.post(
      "https://blinkit-2-yemv.onrender.com/verify-payment",
      {
        
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      }
    );

    if (verify.data.success) {
      await placeOrder("Online", response.razorpay_payment_id);
    } else {
      alert("Payment failed");
    }
  } catch (error) {
    console.log("Verification error:", error);
    alert("Verification failed");
  }
},

        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.number,
        },

        theme: {
          color: "#0f8f1f",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log("Payment error:", error);
      alert("Payment failed");
    }
  };

  const placeOrder = async (mode, paymentId = "") => {
    try {
      const orderData = {
        products: cart,
        user: { ...form, payment: mode },
        totalItems: totalItem(cart),
        totalPrice: totalPrice(cart),
        paymentId,
      };

      await axios.post("https://blinkit-2-yemv.onrender.com/orders/add/payment", orderData);

    
      /*await sendEmail({
        name: form.fullName,
        email: form.email,
        amount: totalPrice(cart),
        payment: mode,
      });*/

      alert("Order Placed Successfully");

      dispatch({ type: "CLEAR_CART" });
      navigate("/");
    } catch (error) {
      console.log("Order save error:", error);
      alert("Order saving failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, number, email, address, payment } = form;

    if (!fullName || !number || !email || !address || !payment) {
      return alert("Fill all fields");
    }

    if (payment === "Online") {
      handlePayment();
    } else {
      placeOrder("COD");
    }
  };

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2 className="checkout-title">Checkout</h2>

        <div className="checkout-summary">
          <h3>Total Items: {totalItem(cart)}</h3>
          <h3>Total Price: ₹{totalPrice(cart)}</h3>
        </div>

        <input
          className="checkout-input"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          className="checkout-input"
          name="number"
          placeholder="Phone Number"
          value={form.number}
          onChange={handleChange}
        />

        <input
          className="checkout-input"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          className="checkout-textarea"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <select
          className="checkout-select"
          name="payment"
          value={form.payment}
          onChange={handleChange}
        >
          <option value="">Select Payment</option>
          <option value="COD">Cash on Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <button className="checkout-button" type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;