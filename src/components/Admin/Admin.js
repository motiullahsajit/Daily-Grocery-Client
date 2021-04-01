import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AddProduct from '../AddProduct/AddProduct';
import ListProduct from '../ListProduct/ListProduct';
import Sidebar from '../Sidebar/Sidebar';

const Admin = () => {
    const [productList, setProductList] = useState([]);
    const { options } = useParams();
    useEffect(() => {
        fetch('https://daily-grocery-server.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProductList(data))
    }, [])
    return (
        <div className='row'>
            <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9">
                {
                    options === 'addProduct' && < AddProduct />
                }
                {
                    options === 'admin' && <h1>Admin dashbord</h1>
                }
                {
                    options === 'manageProduct' && productList.map(product => <ListProduct key={product._id} product={product} />)
                }
                {
                    options === 'editProduct' && <h1>Select Product First</h1>
                }
            </div>
        </div>
    );
};

export default Admin;