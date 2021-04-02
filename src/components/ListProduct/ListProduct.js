import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        <div className='m-2 text-seconday border border-secondary d-flex justify-content-around align-items-center bg-white rounded'>
            < div className='col-7 fs-3'> <h5>{name}</h5></div>
            < div className='col-2 fs-3'> <h5>৳ {price}</h5></div>
            < div className='col-1 fs-3'> <h5>{quantity}</h5></div>
            <div className='col-1'> <span className="fas fa-trash p-2 px-3 fs-4" onClick={() => deleteProduct(_id)}><FontAwesomeIcon icon={faTrash} />
            </span></div>
            <div className='col-1'> <Link to={`/editProduct/${_id}`}><span className="fas fa-trash p-2 px-3 fs-4"><FontAwesomeIcon icon={faPen} /></span></Link></div>
        </div >
    );
};

export default ListProduct;