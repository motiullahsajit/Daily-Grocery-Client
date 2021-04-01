import React, { useEffect, useState } from 'react';
import AddProduct from '../AddProduct/AddProduct';
import ListProduct from '../ListProduct/ListProduct';

const Admin = () => {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        fetch('https://daily-grocery-server.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProductList(data))
    }, [])

    return (
        <>
            <div>
                <AddProduct />
            </div>
            <div>
                {
                    productList.map(product => <ListProduct  key={product._id} product={product}/>)
                }
            </div>
        </>
    );
};

export default Admin;