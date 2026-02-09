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

const updateProductReducer = (state=initialState, action) => {
    switch(action.type){
        case 'UPDATE_PRODUCT_REQUEST':
            return {loading: true, error: false}
        case 'UPDATE_PRODUCT_SUCCESS':
            return {loading: false, product: action.payload, error:false}
        case 'UPDATE_PRODUCT_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

const updateInventoryReducer = (state=initialState, action) => {
    switch(action.type){
        case 'UPDATE_INVENTORY_REQUEST':
            return {loading: true, error: false}
        case 'UPDATE_INVENTORY_SUCCESS':
            return {loading: false, product: action.payload, error:false}
        case 'UPDATE_INVENTORY_FAIL':
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {productReducer, updateProductReducer, updateInventoryReducer };