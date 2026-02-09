import axios from 'axios';

export const InventoryAction = (ProductDetails) => {
    return async (dispatch) => {
        dispatch({type: 'ADD_PRODUCT_REQUEST'})
        try{
            const token = localStorage.getItem('access_token');
            console.log("Token:", token);
            
            const response = await axios.post('http://localhost:8000/addProduct', ProductDetails, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch({type: 'ADD_PRODUCT_SUCCESS', payload: response.data});
            console.log(response.data);
        }
        catch(error){
    console.log("Error: ", error);
    dispatch({
        type: 'ADD_PRODUCT_FAIL',
        payload: error.response?.data?.message || error.message
    });
}
    };
};

export const UpdateProductAction = (formData, sku) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

        const token = localStorage.getItem("access_token");
        console.log(token, "updateeee")

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            params: {sku},
        };

        const response =  await axios.put("http://localhost:8000/updateProduct", formData, config);

        dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: response.data });
    } catch (error) {
        console.error("Update Product Error:", error);
        dispatch({ type: "UPDATE_PRODUCT_FAIL", payload: error.response?.data?.detail || "Error" });
    }
};

export const UpdateInventory = (form) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_INVENTORY_REQUEST" });

        const token = localStorage.getItem("access_token");
        console.log(token, "updateeee");

       const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        const response =  await axios.put("http://localhost:8000/updateInventory", form, config);

        dispatch({ type: "UPDATE_INVENTORY_SUCCESS", payload: response.data });
    } catch (error) {
        console.error("Update Product Error:", error);
        dispatch({ type: "UPDATE_INVENTORY_FAIL", payload: error.response?.data?.detail || "Error" });
    }
};