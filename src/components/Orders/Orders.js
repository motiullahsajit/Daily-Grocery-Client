import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [loggedInUser.email])

    return (
        <div>
            <h3>You have been placed: {orders.length} </h3>
            {
                orders.map(order => <li key={order._id}>Ordered Item: {order.product.name} ,OrderPlaced: {(new Date(order.orderTime).toDateString('dd/mm/yyyy'))}</li>)
            }
        </div>
    );
};

export default Orders;