const redux = require('redux');
const thunk = require('redux-thunk').default;

const {
    breedReducer,
    subbreedReducer,
    breedsReducer,
    subbreedsReducer
} = require('reducers');

export default function configure() {
    const reducer = redux.combineReducers({
        breed: breedReducer,
        subbreed: subbreedReducer,
        breeds: breedsReducer,
        subbreeds: subbreedsReducer
    });

    const store = redux.createStore(reducer, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension(): f => f
    ));

    return store;
}