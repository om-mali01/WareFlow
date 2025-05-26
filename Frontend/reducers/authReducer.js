// src/reducers/userReducer.js
const initialState = {
  loading: false,
  user: null, 
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return { loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { loading: false, user: action.payload };
    case 'REGISTER_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
