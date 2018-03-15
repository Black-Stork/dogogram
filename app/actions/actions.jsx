import * as types from 'actionTypes';
import axios from 'axios';

const baseApiUrl = 'https://dog.ceo/api/';

function fetchData(url, requestAction, successAction, errorAction, options = {method: 'get', responseType: 'json'}) {
    return function(dispatch) {
        dispatch(requestAction());
        return axios({
            baseURL: baseApiUrl,
            url: url,
            timeout: 100000,
            method: options.method,
            responseType: options.responseType
        })
        .then(function(response) {
            dispatch(successAction(response.data));
        })
        .catch(function(response) {
            dispatch(errorAction(response.data));
        });
    }
};

function postData (url, data, requestAction, successAction, errorAction, successCallback, errorCallback, options = {method: 'post', responseType: 'json'}) {
    return function(dispatch) {
        dispatch(requestAction());
        return axios({
            baseURL: baseApiUrl,
            url: url,
            timeout: 100000,
            method: options.method,
            responseType: options.responseType,
            data: data
        })
        .then(function(response) {
            dispatch(successAction(response.data));
            if (successCallback) {
                successCallback();
            }
        })
        .catch(function(response) {
            dispatch(errorAction(response.data));
            if (errorCallback) {
                errorCallback();
            }
        });
    };
};

function putData (url, data, requestAction, successAction, errorAction, successCallback, errorCallback, options = {method: 'put', responseType: 'json'}) {
    return function(dispatch) {
        dispatch(requestAction());
        return axios({
                baseURL: baseApiUrl,
                url: url,
                timeout: 100000,
                method: options.method,
                responseType: options.responseType,
                data: data
            })
            .then(function(response) {
                dispatch(successAction(response.data));
                if (successCallback) {
                    successCallback();
                }
            })
            .catch(function(response) {
                dispatch(errorAction(response.data));
                if (errorCallback) {
                    errorCallback();
                }
            });
    };
};

function deleteData (url, requestAction, successAction, errorAction, successCallback, errorCallback, options = {method: 'delete', responseType: 'json'}) {
    return function(dispatch) {
        dispatch(requestAction());
        return axios({
                baseURL: baseApiUrl,
                url: url,
                timeout: 100000,
                method: options.method,
                responseType: options.responseType
            })
            .then(function(response) {
                //console.log('success ->', response);
                dispatch(successAction(response.data));
                if (successCallback) {
                    successCallback();
                }
            })
            .catch(function(response) {
                //console.log('error ->', response);
                dispatch(errorAction(response.data));
                if (errorCallback) {
                    errorCallback();
                }
            });
    };
};

export const getRequest = (url, options = {method: 'get', responseType: 'json'}) => {
    return axios({
        baseURL: baseApiUrl,
        url: url,
        timeout: 100000,
        method: options.method,
        responseType: options.responseType
    });
};

export const postRequest = (url, data, options = {method: 'post', responseType: 'json'}) => {
    return axios({
        baseURL: baseApiUrl,
        url: url,
        timeout: 100000,
        method: options.method,
        responseType: options.responseType,
        data: data
    });
};

// < FETCH BREEDS >

function fetchBreedsStart() {
    return { type: types.FETCH_BREEDS_START }
};

function fetchBreedsSuccess(json) {
    if(json.status !== "success"){
        fetchBreedsError(json);
        return;
    }
    return {
        type: types.FETCH_BREEDS_SUCCESS,
        data: json.message
    }
};

function fetchBreedsError(json) {
    return {
        type: types.FETCH_BREEDS_FAILURE,
        data: json
    }
};

export const fetchBreeds = () => {
    return fetchData([
            'breeds',
            'list'
        ].join('/'), 
        fetchBreedsStart,
        fetchBreedsSuccess, 
        fetchBreedsError);
}
// <\ FETCH BREEDS >

// < FETCH BREED >

function fetchBreedStart() {
    return { type: types.FETCH_BREED_START }
};

function fetchBreedSuccess(breed, json) {
    if(json.status !== "success"){
        fetchBreedError(json);
        return;
    }
    return {
        type: types.FETCH_BREED_SUCCESS,
        data: {
            name: breed,
            image: json.message
        }
    }
};

function fetchBreedError(json) {
    return {
        type: types.FETCH_BREED_FAILURE,
        data: json
    }
};

export const fetchBreed = (breedName) => {
    return function(dispatch) {
        dispatch(fetchBreedStart());
        return axios({
            baseURL: baseApiUrl,
            url: [
                'breed',
                breedName,
                'images',
                'random'
            ].join('/'),
            method: 'GET',
            responseType: 'json'
        })
        .then(function(response) {
            dispatch(fetchBreedSuccess(breedName, response.data));
        })
        .catch(function(response) {
            dispatch(fetchBreedError(response.data));
        });
    }
}
// <\ FETCH BREED >

// < FETCH SUBBREEDS >

function fetchSubbreedsStart() {
    return { type: types.FETCH_SUBBREEDS_START }
};

function fetchSubbreedsSuccess(json) {
    if(json.status !== "success"){
        fetchSubbreedsError(json);
        return;
    }
    return {
        type: types.FETCH_SUBBREEDS_SUCCESS,
        data: json.message
    }
};

function fetchSubbreedsError(json) {
    return {
        type: types.FETCH_SUBBREEDS_FAILURE,
        data: json
    }
};


export const fetchSubbreeds = (breedName) => {
    return fetchData([
            'breed',
            breedName,
            'list'
        ].join('/'), 
        fetchSubbreedsStart,
        fetchSubbreedsSuccess, 
        fetchSubbreedsError);
}
// <\ FETCH SUBBREEDS >

// < FETCH SUBBREED >

function fetchSubbreedStart() {
    return { type: types.FETCH_SUBBREED_START }
};

function fetchSubbreedSuccess(breed, subbreed, json) {
    if(json.status !== "success"){
        fetchSubbreedError(json);
        return;
    }
    return {
        type: types.FETCH_SUBBREED_SUCCESS,
        data: {
            name: subbreed,
            parent: breed,
            image: json.message
        }
    }
};

function fetchSubbreedError(json) {
    return {
        type: types.FETCH_SUBBREED_FAILURE,
        data: json
    }
};

export const fetchSubbreed = (breedName, subbreedName) => {
    return function(dispatch) {
        dispatch(fetchSubbreedStart());
        return axios({
            baseURL: baseApiUrl,
            url: [
                'breed',
                breedName,
                subbreedName,
                'images',
                'random'
            ].join('/'),
            method: 'GET',
            responseType: 'json'
        })
        .then(function(response) {
            dispatch(fetchSubbreedSuccess(breedName, subbreedName, response.data));
        })
        .catch(function(response) {
            dispatch(fetchSubbreedError(response.data));
        });
    }
}
// <\ FETCH SUBBREED >