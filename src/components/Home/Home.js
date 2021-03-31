import React from 'react';
import Products from '../Products/Products';

const Home = () => {
    return (
        <div classnames='container'>
            <input type="text" placeholder='Search Here'/><button>Search</button>
            <Products/>
        </div>
    );
};

export default Home;