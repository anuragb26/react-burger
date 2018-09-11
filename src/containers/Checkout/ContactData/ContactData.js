import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import Classes from './ContactData.css';

class ContactData extends Component {

    state = {
        orderForm:{
                name : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Your Name'
                    },
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false,
                    value: ''
                },
                street : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Street'
                    },
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false,
                    value: ''
                },
                zipcode : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'ZIPCODE'
                    },
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false,
                    value: ''
                },
                country: {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Country'
                    },
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false,
                    value: ''
                },
                email :  {
                    elementType : 'input',
                    elementConfig : {
                        type : 'email',
                        placeholder : 'Your E-mail'
                    },
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false,
                    value: ''
                },
                deliveryMethod : {
                    elementType : 'select',
                    elementConfig : {
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'}
                        ]
                    },
                    validation:{},
                    value: 'fastest',
                    valid:true
                }
        },
        formIsValid:false,
        loading:false
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        this.setState({loading:true});
        console.debug('price',this.props.price);
        const order = {
          ingredients : this.props.ings,
          price : this.props.price,
          orderData:formData
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

    checkValidity(value,rules){
            let isValid = true;
            if(rules.required){
                isValid = isValid && (value.trim()!=='')
            }
            if(rules.minLength){
                isValid = isValid && value.length >= rules.minLength
            }
            if(rules.maxLength){
                isValid = isValid && value.length <= rules.maxLength
            }
            return isValid;
    }
    inputChangedHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = null;
        if(this.state.loading)
        {
            form = <Spinner />
        }
        else{
            form = (
                <form onSubmit = {this.orderHandler}>
                     {
                        formElementsArray.map(formElement => (
                            <Input
                                key = {formElement.id} 
                                elementType = {formElement.config.elementType}
                                elementConfig = {formElement.config.elementConfig}
                                value = {formElement.config.value}
                                invalid ={!formElement.config.valid}
                                shouldValidate = {formElement.config.validation}
                                touched = {formElement.config.touched}
                                changed = {(event) => this.inputChangedHandler(event,formElement.id)}
                            />
                        ))
                     }
                    <Button btnType="Success" disabled = {!this.state.formIsValid}>ORDER</Button>                    
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

const mapStateToProps = state => ({
    ings:state.ingredients,
    price:state.totalPrice
})

export default connect(mapStateToProps)(ContactData);