import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://my-burger-builder-b7d91.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch{
        yield put(actions.fetchIngredientsFailed());
    }
}