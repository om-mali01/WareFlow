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
            return { loading: true, product: null, error: null };
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
