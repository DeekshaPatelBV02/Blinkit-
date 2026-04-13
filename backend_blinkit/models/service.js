const mongoose=require("mongoose");


const ServiceSchema=new mongoose.Schema({
    image:String
});

const ServiceModel=mongoose.model("Services",ServiceSchema);
module.exports=ServiceModel;