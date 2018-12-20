import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const setIngredients = (ingredients) => {
    return{
        type: actionTypes.INIT_INGREDIENTS,
        ingredients,
    }
}

export const fetchIngredientsFailed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS_START,
    }
}

export const addIngredient = (ingredientName) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName,
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName,
    }
}