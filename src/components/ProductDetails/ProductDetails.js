import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

const DetailsPage = () => {
    const { id } = useParams();

    const [product, setProduct] = useState({})
    useEffect(() => {
        fetch(`https://daily-grocery-server.herokuapp.com/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))

    }, [id])
    const { name, imageURL, price, _id, description, quantity } = product;
    const history = useHistory()
    const handleOrder = () => {
        history.push(`/product/${_id}`);
    }

    return (
        <div className='container'>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className='w-100' src={imageURL} alt={name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h4 className="card-title">{name}</h4>
                            <h4 className="card-title">Quantity : {quantity}</h4>
                            <h5 className="card-text">৳{price}</h5>
                            <p>{description}</p>
                            <button className='btn btn-warning' onClick={handleOrder}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;