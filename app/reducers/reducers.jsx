import * as types from 'actionTypes';

export const breedsReducer = (state = {
        isLoading: false,
        data: [],
        error: false}
    , action = null) => {
        switch(action.type) {
            case types.FETCH_BREEDS_FAILURE:
                return Object.assign({}, state,
                    {
                        isLoading: false, 
                        data: [], 
                        error: true
                    });
            case types.FETCH_BREEDS_SUCCESS:
                return Object.assign({}, state,
                    {
                        isLoading: false, 
                        data: action.data, 
                        error: false
                    });
            case types.FETCH_BREEDS_START:
                return Object.assign({}, state, { isLoading: true, error: false });
        default:
            return state;
        }
};

export const breedReducer = (state = {
    isLoading: false,
    data: [],
    error: false}
, action = null) => {
    switch(action.type) {
        case types.FETCH_BREED_FAILURE:
            return Object.assign({}, state,
                {
                    isLoading: false, 
                    data: {}, 
                    error: true
                });
        case types.FETCH_BREED_SUCCESS:
            return Object.assign({}, state,
                {
                    isLoading: false, 
                    data: action.data, 
                    error: false
                });
        case types.FETCH_BREED_START:
            return Object.assign({}, state, { isLoading: true, error: false });
    default:
        return state;
    }
};

export const subbreedsReducer = (state = {
    isLoading: false,
    data: [],
    error: false}
, action = null) => {
    switch(action.type) {
        case types.FETCH_SUBBREEDS_FAILURE:
            return Object.assign({}, state,
                {
                    isLoading: false, 
                    data: [], 
                    error: true
                });
        case types.FETCH_SUBBREEDS_SUCCESS:
            return Object.assign({}, state,
                {
                    isLoading: false, 
                    data: action.data, 
                    error: false
                });
        case types.FETCH_SUBBREEDS_START:
            return Object.assign({}, state, { isLoading: true, error: false });
    default:
        return state;
    }
};

export const subbreedReducer = (state = {
    isLoading: false,
    data: [],
    error: false}
, action = null) => {
    switch(action.type) {
        case types.FETCH_SUBBREED_FAILURE:
            return Object.assign({}, state,
                {
                    isLoading: false, 
                    data: {}, 
                    error: true
                });
        case types.FETCH_SUBBREED_SUCCESS:
            return Object.assign({}, state,
                {
                    isLoading: false, 
                    data: action.data, 
                    error: false
                });
        case types.FETCH_SUBBREED_START:
            return Object.assign({}, state, { isLoading: true, error: false });
    default:
        return state;
    }
};