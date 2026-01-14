const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
require('dotenv').config(); 

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const razorpayRoute = require('./routes/razorpay'); //Add this line


// Enable CORS middleware BEFORE your routes
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
    ];
    
    // Allow any Vercel app URL
    if (origin && origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    // Allow specified origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });

app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", razorpayRoute); 


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});
