import React, { useState } from 'react'
import { baseUrl } from './apiUrl'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const ModalMenuItem = (props) => {

    let {restaurant} = props;

    let {restaurant_id} = useParams();

    const [menuItem, setMenuItem] = useState([]);

    const [total, setTotal] = useState(0);

    const [name, setName] = useState(props.user ? props.user.name : "");
    const [email, setEmail] = useState(props.user ? props.user.email : "");
    const [contact, setContactNo] = useState("8080805599");
    const [address, setAddress] = useState("xyz");

    const getMenuItem = async () => {
        try{
            let url = baseUrl + "get-menu-item-by-restaurant-id/" + `${restaurant_id}`;
            let {data} = await axios.get(url);
            console.log(data);
            setTotal(0);
            setMenuItem(data.MenuItems);
        }catch(err){
            console.log("found error at get menu item", err);
        }
    };
    
    const qtySub = (index)=>{
        let MenuItem_list = [...menuItem];
        MenuItem_list[index].qty -= 1;
        setMenuItem(MenuItem_list);
        let newTotal = total - MenuItem_list[index].price;
        setTotal(newTotal)
    };
    
    const qtyAdd = (index)=>{
        let MenuItem_list = [...menuItem];
        MenuItem_list[index].qty += 1;
        setMenuItem(MenuItem_list);
        let newTotal = total + MenuItem_list[index].price;
        setTotal(newTotal)
    };

    let MakePayment = async ()=> {

        let url = baseUrl + "generate-order-detail";
        let {data} = await axios.post(url, {amount: total});
        if(data.status === false){
            alert("Unable to create order details");
            console.log(data);
            return false; //stop the code
        }
        let {order} = data;
        var options = {
            "key": "rzp_test_RB0WElnRLezVJ5", // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": order.currency,
            "name": "Zomato Assignment",
            "description": "Online Food Delivery",
            "image": "https://cdn.zeebiz.com/sites/default/files/2018/12/27/66357-zomato-logo.jpg",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            
            "handler": async (response) => {
                let userOrder = menuItem.filter((menuItem)=>{
                    return (menuItem.qty > 0)
                });
                let sendData = {
                    razorpay_order_id : response.razorpay_order_id,
                    razorpay_payment_id : response.razorpay_payment_id,
                    razorpay_client_signature : response.razorpay_signature,
                    Order : userOrder,
                    name: name,
                    email: email,
                    contact: contact,
                    address: address,
                    Total_Amount : total,
                    rest_id: restaurant._id,
                    rest_name: restaurant.name
                }

                let url = baseUrl + "verify-payment-detail";
                let {data} = await axios.post(url, sendData);

                if(data.status === true){
                    alert('Payment is done successfully')
                }else{
                    alert('Payment Fail, please try again.')
                }
            },
            "prefill": {
                "name": name,
                "email": email,
                "contact": contact
            }
        };
        var razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        razorpay.open();                // <=== open a neq window of Razorpay
    };
    
  return (
    // <!-- 1 > modal menu item -->
    <main className="container-fluid d-ne">
        <button className="btn btn-danger mb-4"
            data-bs-toggle="modal" data-bs-target="#MenuItemModal" onClick={getMenuItem} disabled={props.user ? false : true}
        >   {
                props.user ? "See Menu Items" :"Login for menu"
            }
        </button>

        <div className="modal" id="MenuItemModal">
            <section className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <section className="modal-header mb-0">
                        <h5 className="text-navy fw-bold modal-title">{restaurant.name} Menu</h5>
                        <button
                            type="button"
                            className="btn btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            ></button>
                    </section>
                    <article className="modal-body bg-body-tertiary">
                        {
                            menuItem.map((menuItem, index)=> {
                                return(
                                    <div key={index}>
                                        <div className="row px-2 py-3">
                                            <section className="col-8">
                                                <p className="mb-1 h5">{menuItem.name}</p>
                                                <p className="mb-1 ">Rs. {menuItem.price}/-</p>
                                                <p className="mb-1 small text-muted">{menuItem.description}</p>
                                            </section>
                                            <section className="col-4 d-flex justify-content-end">
                                                <div className="menu-food-item">
                                                    <img src={menuItem.image} alt="" className="border border-2"/>
                                                    {
                                                        menuItem.qty > 0 ?
                                                        <div className="order-item-count section">
                                                            <span className="cursor" onClick={()=>qtySub(index)}>-</span>
                                                            <span className="cursor">{menuItem.qty}</span>
                                                            <span className="cursor" onClick={()=>qtyAdd(index)}>+</span>
                                                        </div>
                                                        :
                                                        <button className="btn btn-primary btn-sm add" onClick={()=>qtyAdd(index)}>ADD</button>
                                                    }
                                                    
                                                </div>
                                            </section>
                                        </div>
                                        <hr/>
                                    </div>
                                )
                            })
                        }
                    </article>
                    {
                        total > 0 ? 
                        <section className="px-4 py-3 d-flex justify-content-between">
                            <h4 className="text-navy fs-5 fw-semibold">Total {total}/-</h4>

                           <button className="btn btn-outline-success" type="button"
                            data-bs-toggle="modal"  data-bs-target="#UserForm"
                            >Process<span className="fa fa-angle-right ms-2"></span></button>
                        </section>
                        :
                        null
                    }
                </div>
            </section>
        </div>

        {/* 2> nodal user form */}
        <div className="modal" id="UserForm">

            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <section className="modal-header">
                        <h5 className="text-navy fw-bold">{restaurant.name} User Form</h5>
                        <button type="button" className="btn btn-close" data-bs-dismiss="modal"></button>
                    </section>
                    <article className="modal-body">
                        <div className="row p-2">
                            <label htmlFor="#fullName" className="form-label text-navy fs-6">Name</label>
                            <input id="fullName" type="text" className="form-control" placeholder="Enter your name"
                                name="" value={name} onChange={(event)=>setName(event.target.value)}
                            />
                        </div>
                        <div className="row p-2">
                            <label htmlFor="#mobileNumber" className="form-label text-navy fs-6">Mobile Number</label>
                            <input id="mobileNumber" type="number" className="form-control "placeholder="Enter mobile number"
                                name=""  value={contact} onChange={(event)=>setContactNo(event.target.value)}
                            />
                        </div>
                        <div className="row p-2">
                            <label htmlFor="#email" className="form-label text-navy fs-6">Email</label>
                            <input id="email" type="email" className="form-control"placeholder="name@example.com"
                                name=""  value={email} onChange={(event)=>setEmail(event.target.value)}
                            />
                        </div>
                        <div className="row p-2">
                            <label htmlFor="#address" className="form-label text-navy fs-6">Address</label>
                            <textarea name="" id="address" cols="30" rows="3" className="form-control p-3" placeholder="Enter your address"
                                value={address} onChange={(event)=>setAddress(event.target.value)}
                            ></textarea>
                        </div>
                    </article>
                    <section className="modal-footer d-flex justify-content-between">
                        <button className="btn btn-outline-primary "
                            data-bs-target="#MenuItemModal"
                            data-bs-toggle="modal"><span className="fa fa-angle-left me-1"></span> Back</button>

                        <button className="btn btn-outline-success" onClick={MakePayment}>
                            Make Payment<span className="fa fa-angle-right ms-2"></span>
                        </button>
                        
                    </section>
                </div>
            </div>
        </div>
                
    </main>
  )
}

export default ModalMenuItem