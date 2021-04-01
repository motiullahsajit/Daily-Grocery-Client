import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const CheckOut = () => {
    const { _id } = useParams();
    const [orderItem, setOrderItem] = useState({})
    console.log(orderItem)
    const { register, handleSubmit, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(loggedInUser)
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
                    alert('Your oder placed successfuly')
                }
            })

    };
    useEffect(() => {
        fetch(`https://daily-grocery-server.herokuapp.com/product/${_id}`)
            .then(res => res.json())
            .then(data => setOrderItem(data))
    }, [_id])

    return (
        <div>
            <h1>Your Product id {_id}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={loggedInUser.displayName} ref={register({ required: true })} placeholder='Your Name' />
                {errors.name && <span className='error'>Name is required</span>}
                <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email' />
                {errors.email && <span className='error'>Email is required</span>}
                <input name="address" ref={register({ required: true })} placeholder='Your Address' />
                {errors.address && <span className='error'>Address is required</span>}
                <input name="phone" ref={register({ required: true })} placeholder='Your Phone Number' />
                {errors.phone && <span className='error'>Phone number is required</span>}
                <input type="submit" />
            </form>
        </div>
    );
};

export default CheckOut;