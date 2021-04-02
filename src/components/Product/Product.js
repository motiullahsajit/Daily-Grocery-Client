import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { name, imageURL, price, _id } = product;
    const history = useHistory()
    const handleOrder = () => {
        history.push(`/product/${_id}`);
    }
    return (
        <div className="col-lg-3 col-md-6 col-sm-12 my-2" >
            <div className="card h-100 text-dark">
                <Link to={`/details/${_id}`}><img src={imageURL} className="card-img-top p-3" alt="..." /></Link>
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/details/${_id}`}>{name}</Link></h5>
                    <h5 className="card-text text-secondary"><strong>৳</strong> {price}</h5>
                </div>
                <button className='btn btn-danger rounded-0' onClick={handleOrder}>Buy Now</button>
            </div>
        </div >
    );
};

export default Product;