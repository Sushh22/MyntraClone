require("dotenv").config();
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  try {
    const order = await razorpay.orders.create({
      amount: amount, // amount in paise (e.g., ₹500 = 50000)
      currency: "INR",
      receipt: "receipt_order_" + Math.random().toString(36).substring(7),
    });

    res.status(200).json(order); // returns { id, amount, currency, ... }
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
