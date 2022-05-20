import Axios from 'axios'
import {
    RESTAURANTS_LIST_REQUEST,
    RESTAURANTS_LIST_SUCCESS,
    RESTAURANTS_LIST_FAIL,
    RESTAURANTS_DETAILS_REQUEST,
    RESTAURANTS_DETAILS_SUCCESS,
    RESTAURANTS_DETAILS_FAIL,
    RESTAURANTS_DELETE_SUCCESS,
    RESTAURANTS_DELETE_REQUEST,
    RESTAURANTS_DELETE_FAIL,
    RESTAURANTS_CREATE_REQUEST,
    RESTAURANTS_CREATE_SUCCESS,
    RESTAURANTS_CREATE_FAIL,
    RESTAURANTS_UPDATE_REQUEST,
    RESTAURANTS_UPDATE_SUCCESS,
    RESTAURANTS_UPDATE_FAIL,
    REVIEWS_CREATE_REQUEST,
    REVIEWS_CREATE_SUCCESS,
    REVIEWS_CREATE_FAIL
}
    from "../constants/restaurantsConstants"

export const listRestaurants = () => async (dispatch) => {
    dispatch({ type: RESTAURANTS_LIST_REQUEST })
    try {
        const { data } = await Axios.get(
            '/api/restaurants'
        );
        dispatch({ type: RESTAURANTS_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: RESTAURANTS_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const detailsRestaurants = (restaurantsId) => async (dispatch) => {
    dispatch({ type: RESTAURANTS_DETAILS_REQUEST, payload: restaurantsId })
    try {
        const { data } = await Axios.get(`/api/restaurants/${restaurantsId}`)
        dispatch({ type: RESTAURANTS_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: RESTAURANTS_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const createRestaurants = (restaurant) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESTAURANTS_CREATE_REQUEST,
            payload: restaurant
        })
        const { data } = await Axios.post(`/api/restaurants`, restaurant)
        dispatch({
            type: RESTAURANTS_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: RESTAURANTS_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateRestaurants = (restaurants) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESTAURANTS_UPDATE_REQUEST,
            payload: restaurants
        })
        const { data } = await Axios.put(
            `/api/restaurants/${restaurants.id}`,
            restaurants
        )
        dispatch({
            type: RESTAURANTS_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: RESTAURANTS_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: RESTAURANTS_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const deleteRestaurants = (restaurantsId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESTAURANTS_DELETE_REQUEST,
            payload: restaurantsId
        })
        await Axios.delete(`/api/restaurants/${restaurantsId}`)
        dispatch({
            type: RESTAURANTS_DELETE_SUCCESS,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: RESTAURANTS_DELETE_FAIL,
            payload: message,
        })
    }
}

export const createReviews = (review) => async (dispatch) => {
    try {
        dispatch({
            type: REVIEWS_CREATE_REQUEST,
            payload: review
        })
        const { data } = await Axios.post(`/api/restaurants/${review.id}/addReview`, review)
        dispatch({
            type: REVIEWS_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: REVIEWS_CREATE_FAIL,
            payload: message,
        })
    }
}