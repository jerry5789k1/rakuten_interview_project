import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Reducer from './reducer';
const store = createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(
   <Provider store={store}> 
    <AppContainer/>
   </Provider>, 
   document.getElementById('root'));

