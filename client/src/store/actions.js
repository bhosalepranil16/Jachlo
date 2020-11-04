export const SET_WEB3 = 'SET_WEB3';
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const SET_CONTRACT = 'SET_CONTRACT';
export const SET_LOADING = 'SET_LOADING';
export const SET_COMPANY = 'SET_COMPANY';
export const SET_PRODUCT = 'SET_PRODUCT';
export const APPEND_STAGE = 'APPEND_STAGE';
export const CLEAR_STAGES = 'CLEAR_STAGES';

export const setWeb3 = (web3) => {
    return {
        type : SET_WEB3,
        web3 : web3
    }
}

export const setAccount = (account) => {
    return {
        type : SET_ACCOUNT,
        account : account
    }
}

export const setContract = (contract) => {
    return {
        type : SET_CONTRACT,
        contract : contract
    }
}

export const setLoading = (loading) => {
    return {
        type : SET_LOADING,
        loading : loading
    }
}

export const setCompany = (company) => {
    return {
        type : SET_COMPANY,
        company : company
    }
}

export const setProduct = (product) => {
    return {
        type : SET_PRODUCT,
        product : product
    }
}

export const appendStage = (stage) => {
    return {
        type : APPEND_STAGE,
        stage : stage
    }
}

export const clearStages = () => {
    return {
        type : CLEAR_STAGES
    }
}