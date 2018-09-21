import React, { Component } from 'react';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/aysncComponent';
import {Switch,Route,withRouter,Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreators from './store/actions/'


const asyncCheckout = asyncComponent(()=> {
   return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignIn();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
 
const mapStateToProps = state => ({
  isAuthenticated: state.auth.token!==null
})

const mapDispatchToProps = dispatch => ({
    onTryAutoSignIn : () => dispatch(actionCreators.authCheckState())
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
