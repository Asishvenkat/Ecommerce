const Order =require("../models/Order");
const {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./verifyToken");

const router = require('express').Router();

//create
router.post("/", async (req, res) => {
    console.log("Received order data:", req.body);
    
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        console.log("Order saved successfully:", savedOrder);
        res.status(200).json(savedOrder);
    } catch (err) {
        console.error("Order save error:", err);
        res.status(500).json({ 
            error: err.message,
            details: err.errors || err
        });
    }
});


//Update
router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const updatedOrder= await Order.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    }catch (err){
        res.status(500).json(err);
    }
});

//delete
router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    }catch(err){
        res.status(500).json(err);
    }
})

router.put("/",verifyToken,async(req,res)=>{
     
  const orderdeatils=await Order.findOneAndUpdate(
     {amount:{$gt:500}},
     {$set:{amount:200}}
  )

  res.status(200).json({
    
  })
})

//Get user Orders
router.get("/find/:userId",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        const orders=await Order.find({userId:req.params.userId});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get all

router.get("/",async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json(err);
    }
})

//Get monthly income

router.get("/income", async (req, res) => {
  const currentDate = new Date();
  const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: prevMonth }
        }
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount"
        }
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get monthly order count (for Sales)
router.get("/sales", async (req, res) => {
  const currentDate = new Date();
  const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);

  try {
    const sales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: prevMonth }
        }
      },
      {
        $project: {
          month: { $month: "$createdAt" }
        }
      },
      {
        $group: {
          _id: "$month",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
