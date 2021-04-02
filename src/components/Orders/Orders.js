import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [loggedInUser] = useContext(UserContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const data = await axios(`https://daily-grocery-server.herokuapp.com/orders?email=${loggedInUser.email}`);
            setLoading(false)
            return data;
        }
        fetchData().then(data => setOrders(data?.data))
    }, [loggedInUser.email])

    return (
        <div>
            <h3>Your Previous Orders: {orders.length} </h3>
            {
                loading && <div className="row my-5">
                    <div className="spinner-border text-danger mx-auto" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>
            }
            {
                orders.map(order => <li key={order._id}>Ordered Item: {order.product.name} ,OrderPlaced: {(new Date(order.orderTime).toDateString('dd/mm/yyyy'))}</li>)
            }
        </div>
    );
};

export default Orders;