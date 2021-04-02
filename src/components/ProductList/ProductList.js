import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListProduct from '../ListProduct/ListProduct';
const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const data = await axios('https://daily-grocery-server.herokuapp.com/products');
            setLoading(false)
            return data;
        }
        fetchData().then(data => setProductList(data?.data))
    }, [])
    return (
        <>
            <div className='m-2 text-seconday border border-secondary d-flex justify-content-around align-items-center bg-white rounded'>
                < div className='col-6 fs-3'> <h5>Product Name</h5></div>
                < div className='col-2 fs-3 text-center'> <h5>৳ Price</h5></div>
                < div className='col-2 fs-3 text-center'> <h5>Quantity</h5></div>
                < div className='col-2 text-center fs-3'> <h5>Action</h5></div>
            </div >
            {
                loading && <div className="row my-5">
                    <div className="spinner-border text-danger mx-auto" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>
            }
            {
                productList.map(product => <ListProduct key={product._id} product={product} />)
            }
        </>
    );
};

export default ProductList;