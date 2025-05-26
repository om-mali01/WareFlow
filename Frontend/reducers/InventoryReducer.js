const initialState = {
    loading : false,
    product: null,
    error: null
}

const productReducer = (state=initialState, action) => {
    switch(action.type){
        case 'ADD_PRODUCT_REQUEST':
            return {loading:true, error: false}
        case 'ADD_PRODUCT_SUCCESS':
            return {loading: false, product: action.payload}
        case 'ADD_PRODUCT_FAIL':
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export default productReducer;