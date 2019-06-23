import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as utilityFunctions from "../../shared/utility";
import * as actionCreators from "../../store/actions";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Classes from "./Auth.css";

const auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address"
      },
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false,
      value: ""
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false,
      value: ""
    }
  });
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath === "/checkout") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        touched: true,
        valid: utilityFunctions.checkValidity(
          event.target.value,
          controls[controlName].validation
        )
      }
    };
    setControls(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));
  if (props.loading) {
    form = <Spinner />;
  }
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={Classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">
          CLICK TO {isSignUp ? "SIGN UP" : "SIGN IN"}
        </Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        SWITCH TO {isSignUp ? "SIGN IN" : "SIGN UP"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(actionCreators.auth(email, password, isSignUp)),
  onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath("/"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(auth);
