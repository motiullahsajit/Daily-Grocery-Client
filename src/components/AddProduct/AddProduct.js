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
        <div className="container mt-5">
            <h1>Add Your Products Here</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" placeholder='Product name' ref={register} />
                <br /><br />
                <input name="price" placeholder='Product price' type='number' ref={register} />
                <br /><br />
                <input name="imageURL" type="file" onChange={handleImageUpload} />
                <br /><br />
                <input name="description" placeholder='Description' type="text" ref={register} />
                <br /><br />
                <input name="quantity" placeholder='Quantity' type="text" ref={register} />
                <br /><br />
                {errors.exampleRequired && <span>This field is required</span>}
                <input className='btn btn-danger' type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;