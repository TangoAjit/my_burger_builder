import { put } from "redux-saga/effects";

import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
    
    yield put(actions.purchaseBurgerStart());
    try{
        // we will add .json  for the fire-base API
        const response = yield axios.post('orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    }catch(error){
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart())
    const queryParam = yield '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try{
        const response = yield axios.get('/orders.json' + queryParam);
        const fetchOrders = yield [];
        for(let key in response.data){
            yield fetchOrders.push({
                ...response.data[key],
                id: key,
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchOrders)); 
    }catch(error){
        yield put(actions.fetchOrdersFail(error))
    }
}