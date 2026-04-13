const OrderModel = require("../models/order");
const sendMail = require("./sendEmail");


exports.status=async(req,res)=>{
    try{
        const{status}=req.body;
        const{id}=req.params;
        const order=await OrderModel.findById(id);
        console.log("User:",order.user);

        if(!order){
            return res.status(400).json({message:"Order not found"});
        }

        order.status=status;
        await order.save();

       
        const message=`
        <h2>Order Status Updated</h2>
        <p>Order_ID:${order._id}</p>
        <p>User Name: ${order.user.fullName }</p>
        <p>User Mail: ${order.user.email}</p>
        <p>Order Status: ${status}.</p>
        <p>Payment Method: ${order.user.payment}</p>
        <p>Items: ${order.products.map(p => `${p.name} (x ${p.quantity})`).join(", ")}</p>
        <p>Total: ₹${order.totalPrice}</p>`;

        if(order.user?.email){
            console.log("Sending email to ",order.user.email);
            await sendMail(order.user.email,"order status update",message);
        }
        res.json({success:true});
    }catch(err){
        console.log("ERROR:",err);
        res.status(500).json({error:err.message});
    }
};