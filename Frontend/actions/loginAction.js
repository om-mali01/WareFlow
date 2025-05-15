import axios from 'axios';

export const loginUser = (userData) => {
    return async (dispatch) => {
        dispatch({type: 'LOGIN_REQUEST'})
        try {
            const response = await axios.post('http://localhost:8000/login', userData);
            dispatch({type: 'LOGIN_SUCCESS', payload: response.data});
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('role', response.data.role);
            console.log(response.data, "afddsfsd");
        }
        catch(error){
            dispatch({
                type: 'LOGIN_FAIL',
                payload: error.response?.data?.detail || 'Login Fail',
            });
        }
    };
};