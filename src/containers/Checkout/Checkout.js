import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import * as actionCreators from '../../store/actions';

class Checkout extends Component{
    
    componentWillUnmount(){
        this.props.onResetPurchase();
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render(){
        let  summary = <Redirect to='/' />
        if(this.props.ings){
            console.debug('ings present');
            const purchasedRedirect = (this.props.purchased)?(<Redirect to="/"/>):(null);
            summary = (<div>
                        {purchasedRedirect}
                        <CheckoutSummary ingredients = {this.props.ings}
                                    checkoutCancelled = {this.checkoutCancelledHandler}
                                    checkoutContinued = {this.checkoutContinuedHandler}
                            />
                        <Route path={`${this.props.match.path}/contact-data`}
                            component = {ContactData}
                        />
                       </div>)
        }
        return (
                summary
                       /*
                        Trick to send props render
                        render={(props)=> <ContactData 
                                    // ingredients={this.props.ings}
                                    // totalPrice = {this.props.price}
                                    // {...props} />}
                                    //  />
                        */
                )
    }
}

const mapStateToProps = state => ({
    ings:state.burgerBuilder.ingredients,
    purchased:state.order.purchased
})

const mapDispatchToProps = dispatch => ({
    onResetPurchase: () => dispatch(actionCreators.purchaseReset())
})

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);