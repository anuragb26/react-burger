import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import * as actionCreators from "../../store/actions";

const checkout = props => {
  useEffect(() => {
    return () => {
      props.onResetPurchase();
    };
  }, []);
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.push("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={`${props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
  /*
                        Trick to send props render
                        render={(props)=> <ContactData 
                                    // ingredients={this.props.ings}
                                    // totalPrice = {this.props.price}
                                    // {...props} />}
                                    //  />
                        */
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  purchased: state.order.purchased
});

const mapDispatchToProps = dispatch => ({
  onResetPurchase: () => dispatch(actionCreators.purchaseReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(checkout);
