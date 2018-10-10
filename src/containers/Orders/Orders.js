import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import Order from '../../components/Order/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionCreators from '../../store/actions'

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders(this.props.token, this.props.userId)
  }

  render () {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (<Order key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
      )
      )
    }
    if (orders.length === 0) {
      orders = (<div style={{ 'width': '50%', 'margin': '0 auto' }}>Please <Link to='/'>build</Link> a burger</div>)
    }
    return (
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
