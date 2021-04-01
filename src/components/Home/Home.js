import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Products from '../Products/Products';

const Home = () => {
    document.title = 'Home';
    const [search, setSerch] = useState('');
    const [products, setProducts] = useState([]);
    const handleChange = event => {
        const search = (event.target.value)
        setSerch(search)
    }

    useEffect(() => {
        const fetchData = async () => {
            const url = `https://daily-grocery-server.herokuapp.com/product?name=${search}`;
            const data = await axios(url);
            return data;
        }
        fetchData()
            .then(data => {
                if (data?.data) {
                    setProducts(data?.data)
                }
                else (
                    setProducts(null)
                )
            })
    }, [search])

    return (
        <div classnames='container'>
            <div className="d-flex justify-content-center my-3">
                <input type="text" className='w-50' onBlur={handleChange} placeholder='Search for ...' />
                <button className='btn btn-danger rounded-0'>Search</button>
            </div>
            {
                products ? products.map(product => <Product key={product._id} product={product} />) : <h1>nothing found</h1>
            }
            <Products />
        </div>
    );
};

export default Home;