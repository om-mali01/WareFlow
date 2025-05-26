import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { InventoryAction } from "../../actions/InventoryAction";
import store from "../../store/store";

function AddProduct() {

    const [form, setForm] = useState({
        name: '',
        price: '',
        category: '',
        sub_category: '',
        description: '',
        sku: '',
        image: null // should be null for a file
    });

    const dispatch = useDispatch();
    const { loading, product, error } = useSelector((state) => state.addInventory);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('category', form.category);
        formData.append('sub_category', form.sub_category);
        formData.append('description', form.description);
        formData.append('sku', form.sku);
        formData.append('image', form.image); // file
        dispatch(InventoryAction(formData));

    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm({ ...form, image: files[0] }); // file object
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    return (
        <div className="h-screen bg-slate-500 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="p-5 bg-white w-full max-w-md flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="p-3 border-2"
                    required
                />

                <input
                    type="text"
                    placeholder="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="p-3 border-2"
                    required
                />

                <input
                    type="text"
                    placeholder="Sub Category"
                    name="sub_category"
                    value={form.sub_category}
                    onChange={handleChange}
                    className="p-3 border-2"
                    required
                />

                <input
                    type="text"
                    placeholder="Price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="p-3 border-2"
                    required
                />

                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="p-3 border-2"
                    required
                />

                <input
                    type="text"
                    placeholder="SKU"
                    name="sku"
                    value={form.sku}
                    onChange={handleChange}
                    className="p-3 border-2"
                    required
                />

                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="p-3 border-2"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white w-fit p-2 self-center rounded"
                >
                    Add Product
                </button>
            </form>
            <div>
                {product && <p>Product added: {product.name}</p>}
                {error && <p>Error: {error}</p>}
                </div>
        </div>
    );
}

export default AddProduct;
