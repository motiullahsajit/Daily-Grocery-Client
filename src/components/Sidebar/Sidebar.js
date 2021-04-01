import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='bg-success' style={{ minHeight: "92.8vh" }}>
            <h3>Daily Grocery</h3>
                <Link to='/admin/manageProduct'><h5>Manage Product</h5></Link>
                <Link to='/admin/addProduct'><h5>Add Product</h5></Link>
                <Link to='/admin/editProduct'><h5>Edit Product</h5></Link>
        </div>
    );
};

export default Sidebar;