import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actionCreators from '../../store/actions';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Classes from './Auth.css';

class Auth extends Component {

    state = {
        controls: {
            email:{
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Email Address'
                },
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false,
                value: ''
            },
            password:{
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'Password'
                },
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false,
                value: ''
            },   
        },
        isSignUp:true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath == '/checkout'){
            this.props.onSetAuthRedirectPath();
        }
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp:!prevState.isSignUp
            }
        })
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
        if(rules.isEmail){
            const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event,controlName) => {
        const updatedControls = 
        {
                                ...this.state.controls,
                                [controlName]:
                                {
                                    ...this.state.controls[controlName],
                                    value:event.target.value,
                                    touched:true,
                                    valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation)
                                }
        }
        this.setState({controls:updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement => (
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
        if(this.props.loading){
            form = <Spinner />
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to= {this.props.authRedirectPath} />
        }
        return (
            <div className={Classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <Button btnType="Success" >
                        CLICK TO {this.state.isSignUp?('SIGN UP'):('SIGN IN')}
                    </Button>
                </form>      
                <Button 
                    clicked = {this.switchAuthModeHandler}
                    btnType='Danger'>
                        SWITCH TO {this.state.isSignUp?('SIGN IN'):('SIGN UP')}
                </Button>         
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading:state.auth.loading,
    error:state.auth.error,
    isAuthenticated:state.auth.token!==null,
    buildingBurger:state.burgerBuilder.building,
    authRedirectPath:state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
    onAuth: (email,password,isSignUp) => dispatch(actionCreators.auth(email,password,isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath('/'))
});

export default connect(mapStateToProps,mapDispatchToProps)(Auth);