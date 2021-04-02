import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='h-40 mt-3' style={{ minHeight: "40.8vh" }}>
            <div className="col bg-white p-1 my-1"><h2>Dashbord</h2></div>
            <div className="col bg-white p-1 my-1"><Link to='/admin/manageProduct'><h4>Manage Product</h4></Link></div>
            <div className="col bg-white p-1 my-1"><Link to='/admin/addProduct'><h4>Add Product</h4></Link></div>
            <div className="col bg-white p-1 my-1"><Link to='/admin/editProduct'><h4>Edit Product</h4></Link></div>
        </div>
    );
};

export default Sidebar;