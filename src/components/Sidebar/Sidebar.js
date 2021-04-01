import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <h3>Daily Grocery</h3>
            <ul>
                <Link to='/admin/manageProduct'><li>Manage Product</li></Link>
                <Link to='/admin/addProduct'><li>Add Product</li></Link>
                <Link to='/admin/editProduct'><li>Edit Product</li></Link>
            </ul>
        </>
    );
};

export default Sidebar;