import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import './index.css'
import App from './App'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { watchAuth, watchBurgerBuilder, watchOrders } from './store/sagas/'

const logger = store => {
  return next => {
    return action => {
      //  console.log('Dispatching action',action);
      const result = next(action)
      // console.log('Store current State',store.getState());
      return result
    }
  }
}
const composeEnhancers = (process.env.NODE_ENV === 'development') ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) : (null) || compose

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk, sagaMiddleware)))

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrders)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
