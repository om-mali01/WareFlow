const initialState = {
    loading: false,
    user: null,
    error: null
};

const loginUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return { loading: false, user: action.payload, error: null };
        case 'LOGIN_FAIL':
            return { loading: false, user: null, error: action.payload };
        default:
            return state;
    }
};

export default loginUserReducer;