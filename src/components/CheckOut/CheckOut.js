import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';

const CheckOut = () => {
    document.title = 'Admin Dashbord';
    const { id } = useParams();
    const [orderItem, setOrderItem] = useState({})
    const { register, handleSubmit, errors } = useForm();
    const [loggedInUser] = useContext(UserContext)
    const history = useHistory()
    const onSubmit = data => {
        const orderDetails = { userName: loggedInUser.displayName, userEmail: loggedInUser.email, product: orderItem, shipment: data, orderTime: new Date() }
        fetch('https://daily-grocery-server.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Your order placed successfully')
                    history.push(`/home`);
                }
            })

    };
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios(`https://daily-grocery-server.herokuapp.com/product/${id}`);
            return data;
        }
        fetchData().then(data => setOrderItem(data?.data))
    }, [id])

    return (
        <>
            <h1 className='text-center text-danger'>Checkout</h1>
            <div className="row p-2">
                <div className="col-md-8">
                    <div className="my-3 bg-white d-flex justify-content-around">
                        <div className="col-md-6"><h3>Ordered Item</h3></div>
                        <div className="col-md-3"><h3>Quantity</h3></div>
                        <div className="col-md-3"><h3>Price</h3></div>
                    </div>
                    <div className="bg-white d-flex justify-content-around">
                        <div className="col-md-6"><h4>{orderItem.name}</h4></div>
                        <div className="col-md-3"><h4>1</h4></div>
                        <div className="col-md-3"><h4>৳{orderItem.price}</h4></div>
                    </div>
                </div>
                <div className="col-md-4 mx-auto">
                    <h4>Your Details</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input name="name" className='w-100 py-2 my-2' defaultValue={loggedInUser.displayName} ref={register({ required: true })} placeholder='Your Name' />
                        {errors.name && <span className='error'>Name is required</span>}
                        <input name="email" className='w-100 py-2 my-2' defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email' />
                        {errors.email && <span className='error'>Email is required</span>}
                        <input name="address" className='w-100 py-2 my-2'  ref={register({ required: true })} placeholder='Your Address' />
                        {errors.address && <span className='error'>Address is required</span>}
                        <input name="phone" className='w-100 py-2 my-2'  ref={register({ required: true })} placeholder='Your Phone Number' />
                        {errors.phone && <span className='error'>Phone number is required</span>}
                        <input className='btn btn-danger w-100 py-2 my-2' type="submit" value='CheckOut'/>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CheckOut;