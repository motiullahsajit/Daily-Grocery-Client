import React from 'react';
import { useParams } from 'react-router';
import AddProduct from '../AddProduct/AddProduct';
import Sidebar from '../Sidebar/Sidebar';
import ProductList from '../ProductList/ProductList';
const Admin = () => {
    const { options } = useParams();
    return (
        <div className='row mt-4'>
            <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9">
                {
                    options === 'addProduct' && < AddProduct />
                }
                {
                    options === 'admin' && <h1 className='text-danger text-center'>Admin dashbord</h1>

                }
                {
                    options === 'manageProduct' && <ProductList />
                }
                {
                    options === 'editProduct' && <h1 className='text-danger text-center'>You haven't selected the product</h1>
                }
            </div>
        </div>
    );
};

export default Admin;