import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIncredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
    .map(keys => {
        return [...Array(props.ingredients[keys])].map((_, i) => {
            return <BurgerIngredient key={keys + i} type = {keys}/>
        })
    })
    .reduce((prev, next) => {
        return prev.concat(next);
    }, [])
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return(
        <div className ={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default burger;