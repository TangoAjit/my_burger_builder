import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';

export class BurgerBuilder extends React.Component {

    state = {
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        this.props.onInitialization();
    }

    purchasingHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState((prevState, props) => (
                { purchasing: !prevState.purchasing, }
            ))
        } else {
            this.props.history.push('/auth');
        }
    }

    continuePurchase = () => {

        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);

        // const queryString =  queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push({

            pathname: '/checkout',
            // search:'?' + queryString,
        });
    }

    updatePurchasableHandler = () => {
        const sum = this.props.ingredients ? Object.keys(this.props.ingredients)
            .map((key) => {
                return this.props.ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0) : 0;
        return sum > 0;
    }

    render() {

        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.props.error ? <h2>We can't load Burger</h2> : <Spinner />
        let disableAllButtons = true;
        if (this.props.ingredients) {
            disableAllButtons = false;
            burger = <div>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    order={this.purchasingHandler}
                    purchasable={this.updatePurchasableHandler()}
                    disableAllButtons={disableAllButtons}
                    isAuthenticated={this.props.isAuthenticated}
                />
            </div>;
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                canceled={this.purchasingHandler}
                purchaseHandler={this.continuePurchase}></OrderSummary>;

        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchasingHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuildderReducer.ingredients,
        totalPrice: state.burgerBuildderReducer.totalPrice.toFixed(2),
        error: state.burgerBuildderReducer.error,
        purchased: state.orderReducer.purchased,
        isAuthenticated: state.authReducer.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actionCreators.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actionCreators.removeIngredient(ingredientName)),
        onInitialization: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));