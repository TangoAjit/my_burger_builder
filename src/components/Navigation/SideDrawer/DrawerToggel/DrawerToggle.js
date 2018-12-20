import React from 'react';
import classes from './DrawerToggle.css';

const drawerTogger = (props) => (
    <div className={classes.DrawerToggle} onClick={props.toggleSideDrawer}>
       <div></div>
       <div></div>
       <div></div>
    </div>
)

export default drawerTogger;    