import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [loggedInUser] = useContext(UserContext)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetch(`https://daily-grocery-server.herokuapp.com/orders?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [loggedInUser.email])

    return (
        <div>
            <h3>Your Previous Orders: {orders.length} </h3>
            {
                orders.map(order => <li key={order._id}>Ordered Item: {order.product.name} ,OrderPlaced: {(new Date(order.orderTime).toDateString('dd/mm/yyyy'))}</li>)
            }
        </div>
    );
};

export default Orders;