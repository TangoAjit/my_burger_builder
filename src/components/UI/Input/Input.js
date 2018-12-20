import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let validationError = null;
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        validationError = <p>Please Enter the correct value!</p>;
    }
    switch(props.elementType){
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.clicked}/>
            break;
        case('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.clicked}/>
            break;
        case('select'):
            inputElement = <select 
                className={inputClasses.join(' ')}  
                value={props.value}
                onChange={props.clicked}>
                    {props.elementConfig.options.map((option) => (
                        <option 
                            key={option.value} 
                            value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.clicked}/>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            <div className={classes.ValidationError}>
                {validationError}
            </div>
        </div>
    )
};

export default input;