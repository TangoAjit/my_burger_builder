import React from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component{
    
    componentDidMount(){
        this.props.onInitOrders(this.props.token, this.props.userId);
        
    }

    render(){
        let orders = null;
        if(this.props.loading){
            orders = <Loader/>
        }else{
            orders = this.props.orders.map((order) => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>));
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        orders: state.orderReducer.orders,
        error: state.orderReducer.error,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onInitOrders : (token, userId) => dispatch(actionCreators.fetchOrders(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));