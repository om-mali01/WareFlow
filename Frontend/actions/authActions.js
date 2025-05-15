// src/actions/userActions.js
import axios from 'axios';

export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: 'REGISTER_REQUEST' });
    try {
      const response = await axios.post('http://localhost:8000/register', userData);
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: error.response?.data?.detail || 'Registration failed',
      });
    }
  };
};
