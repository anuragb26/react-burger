import * as actionTypes from './actionTypes'

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
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
}

export const purchaseReset = () => {
  return {
    type: actionTypes.PURCHASE_RESET
  }
}
