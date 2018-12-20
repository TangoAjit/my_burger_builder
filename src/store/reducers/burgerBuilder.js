import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4.40,
    error: false,
    building: false,
}

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.2,
    bacon : 0.7,
}

const addIngredients = (state, action) => {
    const updateIngredient =  {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updateIngredients = updateObject(state.ingredients, updateIngredient)
    const updateState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
    }
    return updateObject(state, updateState);
}   

const removeIngredient = (state, action) => {
    const updateIng =  {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updateIngs = updateObject(state.ingredients, updateIng)
    const updateSt = {
        ingredients: updateIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    }
    return updateObject(state, updateSt);
}

const initIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: action.ingredients?false:true,
        totalPrice: 4.40,
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);      
        case actionTypes.INIT_INGREDIENTS: return initIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;