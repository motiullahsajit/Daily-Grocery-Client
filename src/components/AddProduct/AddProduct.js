import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
const AddProduct = () => {
    const { register, handleSubmit, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const history = useHistory()
    const onSubmit = data => {
        const eventData = {
            name: data.name,
            imageURL: imageURL,
            price: data.price,
            description: data.description,
            quantity: data.quantity
        }
        fetch('https://daily-grocery-server.herokuapp.com/addproduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(res => console.log('server site res', res))
        history.push(`/admin/manageProduct`);
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
        <div className="container mt-4">
            <div className="col-md-6 mx-auto">
                <h2 className='text-danger text-center'>Product Information</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="name" className='w-100 py-2 my-2' placeholder='Product name' ref={register} />
                    <input name="price" className='w-100 py-2 my-2' placeholder='Product price' type='number' ref={register} />
                    <input name="description" className='w-100 py-2 my-2' placeholder='Description' type="text" ref={register} />
                    <input name="quantity" className='w-100 py-2 my-2' placeholder='Quantity' type="text" ref={register} />
                    <h5 className="text-secondary">Select Image</h5>
                    <input name="imageURL" className='my-3' type="file" onChange={handleImageUpload} />
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input className='btn btn-danger w-100' type="submit" value='Add' />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;