import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Loader from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';

class ContactData extends React.Component {
    state = {
        orderForm : {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: '',
                validation:{
                    required : true,
                },
                valid: false,
                touched : false,
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation:{
                    required : true,
                },
                valid: false,
                touched : false,
            },
            zipcode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation:{
                    required : true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched : false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation:{
                    required : true,
                },
                valid: false,
                touched : false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail',
                },
                value: '',
                validation:{
                    required : true,
                    isEmail: true,
                },
                valid: false,   
                touched : false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'fastest', displayValue: 'Fastest' },
                        {value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                    placeholder: 'Your E-mail',
                },
                value: 'fastest',
                valid: true,
            },
        },  
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
      
        let formData = {};
        for(let elementIdentifier in this.state.orderForm){
            formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
        }
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData : formData,
            userId: this.props.userId,
        }

        this.props.onOrderBurger(data, this.props.token);
        
    }

    inputChangedHandler = (event, inputIdentifier) => {
        let updatedOrderForm = {
            ...this.state.orderForm
        };

        let updatedOrderElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedOrderElement.value = event.target.value;
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation);
        updatedOrderElement.touched = true;
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        updatedOrderForm[inputIdentifier] = updatedOrderElement;
        this.setState({
            orderForm : updatedOrderForm,
            formIsValid: formIsValid,
        })
    }

    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.isEmail){
            const pattern = /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    render() {
        let formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }
        let form = null;
        if(this.props.loading){
            form = <Loader/>
        }else{
            form = 
            <div>
            <h4>Enter your contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map((formElement) => 
                        <Input 
                            key = {formElement.id}
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            clicked = {(event) => this.inputChangedHandler(event, formElement.id)}
                            shouldValidate = {formElement.config.validation}
                            invalid = {!formElement.config.valid}
                            touched = {formElement.config.touched}
                        />     
                    )}

                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            </div>
        }
        return(
            <div className={classes.ContactData}>
                {form}    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuildderReducer.ingredients,
        price: state.burgerBuildderReducer.totalPrice,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger : (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));