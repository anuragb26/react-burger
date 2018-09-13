import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';



const logger = store => {
    return next => {
        return action => {
            console.log('Dispatching action',action);
            const result = next(action);
            console.log('Store current State',store.getState());
            return result;
        }
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
})

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));

const app = (
            <Provider store={store}> 
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
            );

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
