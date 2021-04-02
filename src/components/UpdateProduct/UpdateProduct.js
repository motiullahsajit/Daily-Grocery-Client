import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import Sidebar from '../Sidebar/Sidebar';

const UpdateProduct = () => {
    const { id } = useParams();
    const { register, handleSubmit, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [updateItem, setUpdateItem] = useState({});
    const history = useHistory();
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios(`https://daily-grocery-server.herokuapp.com/product/${id}`);
            return data;
        }
        fetchData().then(data => setUpdateItem(data?.data))
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
        <div className="row">
            <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9">
               <div className="col-md-6">
                <h2 className='text-danger'>Update Information</h2>
               <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="name" defaultValue={updateItem.name} className='w-100 py-2 my-2' placeholder='Product name' ref={register} />
                    <input name="price" defaultValue={updateItem.price} className='w-100 py-2 my-2' placeholder='Product price' type='number' ref={register} />
                    <h6 className='text-secondary'>Reupload Image</h6>
                    <input name="imageURL" className='w-100 py-2' defaultValue={updateItem.imageURL} type="file" ref={register} onChange={handleImageUpload} />
                    <input name="description" defaultValue={updateItem.description} className='w-100 py-2 my-2' placeholder='Description' type="text" ref={register} />
                    <input name="quantity" defaultValue={updateItem.quantity} className='w-100 py-2 my-2' placeholder='Quantity' type="text" ref={register} />
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input className='btn btn-danger w-100' type="submit" value='Update' />
                </form>
               </div>
            </div>
        </div>
    );
};

export default UpdateProduct;