import { createStore, applyMiddleware, compose } from 'redux'
import Thunk from 'redux-thunk'
import reducer from './store'
import { createLogger } from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [ Thunk ]
middleware.push(createLogger())

export default function configureStore() {
    return createStore(
        reducer,
        composeEnhancers(
            applyMiddleware(...middleware)
        )
    )
}