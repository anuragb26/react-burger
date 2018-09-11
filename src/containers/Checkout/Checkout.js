import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary ingredients = {this.props.ings}
                                 checkoutCancelled = {this.checkoutCancelledHandler}
                                 checkoutContinued = {this.checkoutContinuedHandler}
                />
                <Route path={`${this.props.match.path}/contact-data`}
                       component = {ContactData}
                       />
                       
                       {/*
                        Trick to send props render
                        render={(props)=> <ContactData */
                                    // ingredients={this.props.ings}
                                    // totalPrice = {this.props.price}
                                    // {...props} />}
                                    //  />
                        }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ings:state.ingredients
})

export default connect(mapStateToProps)(Checkout);