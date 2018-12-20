import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component {
    
    state = {
        showSideDrawer : false,
    }

    sideDrawerClosedHandler = () => {
        this.setState((prevState, props) => ({
            showSideDrawer: false,
        }))
    }
    
    toggleSideDrawer = () => {
        this.setState((prevState, props) => ({
            showSideDrawer: !prevState.showSideDrawer,
        }))
    }

    render(){
        return(
            <Aux>
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated}
                    toggleSideDrawer={this.toggleSideDrawer}/>
                <SideDrawer 
                    isAuthenticated={this.props.isAuthenticated}
                    show={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content} >
                    {this.props.children}
                </main>
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    return{
        isAuthenticated: state.authReducer.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return{

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);