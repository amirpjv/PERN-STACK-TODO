import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
    restaurantsListReducer,
    restaurantsCreateReducer,
    restaurantsDeleteReducer,
    restaurantsDetailsReducer,
    restaurantsUpdateReducer,
    reviewsCreateReducer
} from './reducers/restaurantsReducers'

const initialState = {}

const reducer = combineReducers({
    restaurantsList: restaurantsListReducer,
    restaurantsCreate: restaurantsCreateReducer,
    restaurantsDelete: restaurantsDeleteReducer,
    restaurantsDetails:restaurantsDetailsReducer,
    restaurantsUpdate:restaurantsUpdateReducer,
    reviewsCreate:reviewsCreateReducer
})

const store = createStore(reducer, initialState, applyMiddleware(thunk))

export default store