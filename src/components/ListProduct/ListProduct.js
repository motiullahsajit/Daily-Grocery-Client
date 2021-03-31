import React from 'react';

const ListProduct = ({ product }) => {
    const { name, price, _id } = product;
    const deleteProduct = id => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    console.log(result)
                }
            })
    }
    const updateProduct = id => {
        console.log('hit inside')
        const name = document.getElementById('name').value;
        const todo = { id, name }
        fetch(`http://localhost:5000/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    document.getElementById('update').innerHTML = ''
                }
            })
    }

    return (
        <div className='m-2 bg-success text-white d-flex justify-content-around'>
            < div className='col-8 fs-3'> <h3>{name}</h3></div>
            < div className='col-3 fs-3'> <h3>৳ {price}</h3></div>
            <div className='col-1 mx-1'> <button className="fas fa-trash p-2 px-3 fs-4" onClick={() => deleteProduct(_id)}>Delete</button></div>
            <div className='col-1 mx-1'> <button className="fas fa-trash p-2 px-3 fs-4" onClick={() => updateProduct(_id)}>Update</button></div>
        </div >
    );
};

export default ListProduct;