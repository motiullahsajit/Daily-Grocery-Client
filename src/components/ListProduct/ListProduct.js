import React from 'react';
import { Link } from 'react-router-dom';

const ListProduct = ({ product }) => {
    const { name, price, _id, quantity } = product;
    const deleteProduct = id => {
        fetch(`https://daily-grocery-server.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    console.log(result)
                }
            })
    }

    return (
        <div className='m-2 bg-success text-white d-flex justify-content-around align-items-center'>
            < div className='col-7 fs-3'> <h3>{name}</h3></div>
            < div className='col-2 fs-3'> <h3>৳ {price}</h3></div>
            < div className='col-1 fs-3'> <h3>{quantity}</h3></div>
            <div className='col-1 mx-1'> <button className="fas fa-trash p-2 px-3 fs-4" onClick={() => deleteProduct(_id)}>Delete</button></div>
            <div className='col-1 mx-1'> <Link to={`/update/${_id}`}><button className="fas fa-trash p-2 px-3 fs-4">Update</button></Link></div>
        </div >
    );
};

export default ListProduct;