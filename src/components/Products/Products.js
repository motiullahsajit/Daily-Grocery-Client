import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const data = await axios('https://daily-grocery-server.herokuapp.com/products');
            setLoading(false)
            return data;
        }
        fetchData().then(data => setProducts(data.data))
    }, [])

    return (
        <div className='row g-4'>
            {
                loading && <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden"></span>
                </div>
            }
            {
                products.map(product => <Product key={product._id} product={product} />)
            }
        </div>
    );
};

export default Products;