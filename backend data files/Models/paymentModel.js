const mongoose = require(`mongoose`);

const PaymentSchema = new mongoose.Schema(
    {
        razorpay_order_id : {type: String},
        razorpay_payment_id : {type: String},
        razorpay_client_signature : {type: String},
        Order : {type: Array},
        name: {type: String},
        email: {type: String},
        contact: {type: String},
        address: {type: String},
        Total_Amount : {type: Number},
        rest_id: {type: mongoose.Schema.Types.ObjectId},
        rest_name:{type: String},
    }
);

const OrderModel = mongoose.model(`order`, PaymentSchema, `userOrders`);

module.exports = OrderModel;