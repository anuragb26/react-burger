import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Classes from './ContactData.css';

class ContactData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            address:{
                street:'',
                postalCode:''
            },
            loading:false
        };
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
          ingredients : this.props.ingredients,
          price : this.props.totalPrice,
          customer : {
              name : 'Anurag Bajaj',
              address : {
                  street : 'Baner',
                  zipcode : '411405',
                  country: 'India'
              },
              email: 'anuragb26@gmail.com'
          },
          deliveryMethod : 'fastest'
        }
        axios.post('/orders.json',order)
        .then(response => {
                        this.setState({loading:false});
                        this.props.history.push('/');
                })
        .catch(error => {
                        this.setState({loading:false})
                      });
    }
    render() {
        let form = null;
        if(this.state.loading)
        {
            form = <Spinner />
        }
        else{
            form = (
                <form>
                    <input  className={Classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={Classes.Input}  type="email" name="email" placeholder="Your Email" />
                    <input className={Classes.Input}  type="text" name="street" placeholder="Street" />
                    <input  className={Classes.Input} type="text" name="postal" placeholder="Postal" />
                    <Button btnType="Success" clicked = {this.orderHandler}>ORDER</Button>                    
                </form>
            )
        }
        return (
            <div className={Classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
