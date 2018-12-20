import React from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    


    return class extends React.Component {
        state= {
            error : null,
        }

        componentWillMount(){
           this.reqInterceptor =  axios.interceptors.request.use(req => {
                this.setState({
                    error: null,
                })
                return req;
            })
            this.resInterceptor =  axios.interceptors.response.use(res => res,error => {
                this.setState({
                    error: error,
                })
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        modalHandler = () => {
            this.setState({
                error: null,
            })
        }

        render(){
            let modal = null;
            if(this.state.error){
                modal = <Modal 
                    show = {true}
                    closeModal={this.modalHandler}>{this.state.error.message}</Modal>
            }
            return(
                <Aux>
                    {modal}
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;