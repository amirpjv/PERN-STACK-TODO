import {
  RESTAURANTS_LIST_REQUEST,
  RESTAURANTS_LIST_SUCCESS,
  RESTAURANTS_LIST_FAIL,
  RESTAURANTS_DETAILS_REQUEST,
  RESTAURANTS_DETAILS_SUCCESS,
  RESTAURANTS_DETAILS_FAIL,
  RESTAURANTS_DELETE_REQUEST,
  RESTAURANTS_DELETE_SUCCESS,
  RESTAURANTS_DELETE_FAIL,
  RESTAURANTS_DELETE_RESET,
  RESTAURANTS_CREATE_RESET,
  RESTAURANTS_CREATE_FAIL,
  RESTAURANTS_CREATE_SUCCESS,
  RESTAURANTS_CREATE_REQUEST,
  RESTAURANTS_UPDATE_REQUEST,
  RESTAURANTS_UPDATE_SUCCESS,
  RESTAURANTS_UPDATE_FAIL,
  RESTAURANTS_UPDATE_RESET,
  REVIEWS_CREATE_REQUEST,
  REVIEWS_CREATE_SUCCESS,
  REVIEWS_CREATE_FAIL,
  REVIEWS_CREATE_RESET
}
  from "../constants/restaurantsConstants"

export const restaurantsListReducer = (state = { restaurants: [] }, action) => {
  switch (action.type) {
    case RESTAURANTS_LIST_REQUEST:
      return { loading: true }
    case RESTAURANTS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        restaurants: action.payload
        // restaurants: [
        //   action.payload
        // ]
      };
    case RESTAURANTS_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const restaurantsDetailsReducer = (state = { loading: true, restaurants: {}, reviews: [] }, action) => {
  switch (action.type) {
    case RESTAURANTS_DETAILS_REQUEST:
      return { loading: true }
    case RESTAURANTS_DETAILS_SUCCESS:
      return { loading: false, success: true, restaurants: action.payload.data.restaurant, reviews: action.payload.data.reviews }
    case RESTAURANTS_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const restaurantsDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANTS_DELETE_REQUEST:
      return { loading: true }
    case RESTAURANTS_DELETE_SUCCESS:
      return { loading: false, success: true }
    case RESTAURANTS_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case RESTAURANTS_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const restaurantsCreateReducer = (state = { restaurant: {} }, action) => {
  switch (action.type) {
    case RESTAURANTS_CREATE_REQUEST:
      return { loading: true }
    case RESTAURANTS_CREATE_SUCCESS:
      return { loading: false, success: true, restaurant: action.payload }
    case RESTAURANTS_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case RESTAURANTS_CREATE_RESET:
      return { restaurant: {} }
    default:
      return state
  }
}

export const restaurantsUpdateReducer = (state = { restaurants: {} }, action) => {
  switch (action.type) {
    case RESTAURANTS_UPDATE_REQUEST:
      return { loading: true }
    case RESTAURANTS_UPDATE_SUCCESS:
      return { loading: false, success: true, restaurants: action.payload }
    case RESTAURANTS_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case RESTAURANTS_UPDATE_RESET:
      return { restaurants: {} }
    default:
      return state
  }
}

export const reviewsCreateReducer = (state = { reviews: {} }, action) => {
  switch (action.type) {
    case REVIEWS_CREATE_REQUEST:
      return { loading: true }
    case REVIEWS_CREATE_SUCCESS:
      return { loading: false, success: true, reviews: action.payload }
    case REVIEWS_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case REVIEWS_CREATE_RESET:
      return { reviews: {} }
    default:
      return state
  }
}