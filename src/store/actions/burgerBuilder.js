import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}


export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-backend-95470.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error =>{
            dispatch(fetchIngredientsFailed())
        });
    }
}

export const purchaseReset = () => {
    return {
        type: actionTypes.PURCHASE_RESET
    }
}