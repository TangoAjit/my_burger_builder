import React from 'react';
import burgerLogo from '../../assets/Images/1.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} >
        <img src={burgerLogo} alt='MyBurger'></img>
    </div>
)

export default logo;