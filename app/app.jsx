import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, IndexRoute } from 'react-router-dom'

import Layout       from 'Layout';
import Main         from 'Main';

import configureStore from 'configureStore'; 

const store = configureStore();
let unsubscribe = store.subscribe(() => {
    //console.log('New state', store.getState());
});

// Stop listening to state updates
//unsubscribe();

const MainRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <Layout>
                <Component {...matchProps} />
            </Layout>
        )}/>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <MainRoute path="/"      component={Main} exact />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);

//require('./redux-example');