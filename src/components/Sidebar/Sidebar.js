import { faEdit, faPlusSquare, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='h-40 mt-3' style={{ minHeight: "40.8vh" }}>
            <div className="col bg-white p-2 my-1"><Link to='/admin/admin'><h2>Dashbord</h2></Link></div>
                <div className="col bg-white p-2 my-1"><Link to='/admin/manageProduct'><h4><FontAwesomeIcon icon={faTasks} className='mx-2'/>Manage Products</h4></Link></div>
                <div className="col bg-white p-2 my-1"><Link to='/admin/addProduct'><h4><FontAwesomeIcon icon={faPlusSquare} className='mx-2'/>Add Product</h4></Link></div>
                <div className="col bg-white p-2 my-1"><Link to='/admin/editProduct'><h4><FontAwesomeIcon icon={faEdit} className='mx-2'/>Edit Product</h4></Link></div>
        </div>
    );
};

export default Sidebar;