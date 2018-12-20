import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(key => <li key={key}><span style={{textTransform:'capitalize'}}>{key} :</span>{props.ingredients[key]}</li>);
    return(
        <Aux>
            <h3>Your Orders</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.canceled} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.purchaseHandler} btnType='Success'>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;