import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    orderDate : {type : Date , default : Date.now},
    amount : {type : Number , required : true},
    status : {type : String , enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending'},
    product : {type : String , required : true},
    customer : {
         type : mongoose.Schema.Types.ObjectId,
          ref : 'Customer' }
});

const Order = mongoose.model('Order' , ordersSchema);
export default Order;