import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import Sidebar from '../Sidebar/Sidebar';

const UpdateProduct = () => {
    const { id } = useParams();
    const { register, handleSubmit, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [updateItem, setUpdateItem] = useState({})
    const history = useHistory()
    useEffect(() => {
        fetch(`https://daily-grocery-server.herokuapp.com/product/${id}`)
            .then(res => res.json())
            .then(data => setUpdateItem(data))
    }, [id])

    const onSubmit = data => {
        const UpdateData = {
            name: data.name,
            imageURL: imageURL || data.imageURL,
            price: data.price,
            description: data.description,
            quantity: data.quantity
        }
        fetch(`https://daily-grocery-server.herokuapp.com/update/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(UpdateData)
        })
        history.push(`/home`);
    };

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', 'ea5f66854b1d86a62785b81c38b625d0');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="row">
             <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9">
            <h1>Update Your Products Here</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={updateItem.name} placeholder='Product name' ref={register} />
                <br /><br />
                <input name="price" defaultValue={updateItem.price} placeholder='Product price' type='number' ref={register} />
                <br /><br />
                <input name="imageURL" placeholder='Reupload the image' defaultValue={updateItem.imageURL} type="file" ref={register} onChange={handleImageUpload} />
                <br /><br />
                <input name="description" defaultValue={updateItem.description} placeholder='Description' type="text" ref={register} />
                <br /><br />
                <input name="quantity" defaultValue={updateItem.quantity} placeholder='Quantity' type="text" ref={register} />
                <br /><br />
                {errors.exampleRequired && <span>This field is required</span>}
                <input className='btn btn-danger'type="submit" value='Update' />
            </form>
            </div>
        </div>
    );
};

export default UpdateProduct;