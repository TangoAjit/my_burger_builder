import React from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component{

    // state = {
    //     ingredients : null,
    //     price: 0,
    // }

    componentWillMount(){
        
       // this.props.purchaseInit();

        // const query = this.props.location.search.split('&');
        // let ingredients = {};
        // let price = 0;         
        // for(let i in query){
        //     const entry = query[i].split('=');
        //     entry[0] = entry[0] == '?bacon' ? entry[0].substring(1) : entry[0];
        //     if(entry[0] == 'price'){
        //         price = entry[1];
        //     }else {
        //         ingredients[entry[0]] = +entry[1];
        //     }
        // }
        // this.setState({
        //     ingredients: ingredients,
        //     price: price   
        // })
    }


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push("/checkout/contact-data");
    }

    render(){
        let summary = <Redirect to='/' />
        if(this.props.ingredients){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary 
                ingredients={this.props.ingredients}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}/>
                <Route path={this.props.match.url + '/contact-data'}
                    component={ContactData}/>
                </div>
        }
        return summary;
    }
};

const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuildderReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
};

export default connect(mapStateToProps)(Checkout);