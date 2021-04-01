import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';

const CheckOut = () => {
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
        fetch(`https://daily-grocery-server.herokuapp.com/product/${id}`)
            .then(res => res.json())
            .then(data => setOrderItem(data))
    }, [id])

    return (
        <div>
            <h1>Checkout</h1>
            <div className="row mt-4">
                <div className="col-md-6">Description</div>
                <div className="col-md-3">Quantity</div>
                <div className="col-md-3">Price</div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">{orderItem.name}</div>
                <div className="col-md-3">1</div>
                <div className="col-md-3">৳{orderItem.price}</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={loggedInUser.displayName} ref={register({ required: true })} placeholder='Your Name' />
                <br /><br />
                {errors.name && <span className='error'>Name is required</span>}
                <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email' />
                <br /><br />
                {errors.email && <span className='error'>Email is required</span>}
                <input name="address" ref={register({ required: true })} placeholder='Your Address' />
                <br /><br />
                {errors.address && <span className='error'>Address is required</span>}
                <input name="phone" ref={register({ required: true })} placeholder='Your Phone Number' />
                <br /><br />
                {errors.phone && <span className='error'>Phone number is required</span>}
                <input type="submit" />
            </form>
        </div>
    );
};

export default CheckOut;