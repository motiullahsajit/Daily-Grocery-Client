import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Products from '../Products/Products';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [search, setSerch] = useState('');
    const [products, setProducts] = useState([]);
    const handleChange = event => {
        const search = (event.target.value)
        setSerch(search)
    }

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const url = `https://daily-grocery-server.herokuapp.com/product?name=${search}`;
            const data = await axios(url);
            setLoading(false)
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
            <input type="text" className='w-75' onBlur={handleChange} placeholder='Search for meals...' />
            <button>Search</button>
            {
                loading && <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden"></span>
                </div>
            }
            {
                products ? products.map(product => <Product key={product._id} product={product} />) : <h1>nothing found</h1>
            }
            <Products />
        </div>
    );
};

export default Home;