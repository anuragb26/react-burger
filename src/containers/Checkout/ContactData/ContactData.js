import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "../../../axios-orders";
import * as utilityFunctions from "../../../shared/utility";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import Classes from "./ContactData.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../../store/actions";

const contactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      value: ""
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street"
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      value: ""
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIPCODE"
      },
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false,
      value: ""
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country"
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      value: ""
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-mail"
      },
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false,
      value: ""
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      validation: {},
      value: "fastest",
      valid: true
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = utilityFunctions.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }
  let form = null;
  if (props.loading) {
    form = <Spinner />;
  } else {
    form = (
      <form onSubmit={orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={
              Object.keys(formElement.config.validation).length > 0
            }
            touched={formElement.config.touched}
            changed={event => inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    );
  }
  return (
    <div className={Classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) =>
    dispatch(orderActions.purchaseBurger(orderData, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));
