import { SET_WEB3, SET_ACCOUNT, SET_CONTRACT, SET_LOADING, SET_COMPANY, SET_PRODUCT, APPEND_STAGE, CLEAR_STAGES } from './actions';

const initialState = {
    loading : true,
    account : '',
    contract : null,
    web3 : null,
    company : '',
    product : '',
    productStages : []
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_WEB3:
            return {
                ...state,
                web3 : action.web3
            }
        case SET_ACCOUNT :
            return {
                ...state,
                account : action.account
            }
        case SET_CONTRACT : 
            return {
                ...state,
                contract : action.contract
            }
        case SET_LOADING : 
            return {
                ...state,
                loading : action.loading
            }

        case SET_COMPANY : 
            return {
                ...state,
                company : action.company
            }

        case SET_PRODUCT : 
            return {
                ...state,
                product : action.product
            }
        case APPEND_STAGE :
            const newProductStages = [...state.productStages];
            newProductStages.push(action.stage);
            return {
                ...state,
                productStages : newProductStages
            }
        
        case CLEAR_STAGES :
            return {
                ...state,
                productStages : []
            }
            
        default : 
            return {
                ...state
            }
    }
}

export default reducer;