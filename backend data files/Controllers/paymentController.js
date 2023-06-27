const crypto = require("crypto");
const Razorpay = require('razorpay');
const OrderModel = require("../Models/paymentModel");

const KEY_ID = "rzp_test_RB0WElnRLezVJ5";
const KEY_SECRET = "VLMCIrqKxRMNR9EcRcbL2UG8";

let instance = new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
});

module.exports.genOrderDetails = (request, response) => {
    let {amount} = request.body;
    var options = {
        amount: amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function(err, order) {
        if(err){
            let errObj = {status: false, error: err}
            response.status(500).send(errObj);
        }else{
            let sendData = { status: true, order};
            response.status(200).send(sendData)
        }
    })
};

module.exports.verifyPaymentDetails = async (request, response) => {
    let { razorpay_order_id, razorpay_payment_id, razorpay_client_signature } = request.body;
    let data = request.body;
    let payment_Data = razorpay_order_id + "|" + razorpay_payment_id
          
    let expected_Server_Signature = crypto
        .createHmac('sha256', KEY_SECRET)
        .update(payment_Data.toString())
        .digest('hex');

    console.log("sig received ", razorpay_client_signature);
    console.log("sig generated ", expected_Server_Signature);

    if(expected_Server_Signature === razorpay_client_signature){
        response.send( {status: true} );
        await saveOrder(data);
    }else{
        response.send( {status: false} )
    }
};

let saveOrder = async (data) => {
    let saveData = {
        razorpay_order_id : data.razorpay_order_id,
        razorpay_payment_id : data.razorpay_payment_id,
        razorpay_client_signature : data.razorpay_client_signature,
        Order : data.Order,
        name: data.name,
        email: data.email,
        contact: data.contact,
        address: data.address,
        Total_Amount : data.Total_Amount,
        rest_id: data.rest_id,
        rest_name: data.rest_name,
    };
        // this wil save data in database
        // here data variable is an object {} & it's  is data is client data
  
    let newOrder = new OrderModel(saveData);

    let result = await newOrder.save();

    if(result){
        return true
    }else{
        return false
    }
};