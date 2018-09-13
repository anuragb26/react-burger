import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import Aux from "../../hoc/Wrapper";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';
import * as authActions from '../../store/actions/auth';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

class BurgerBuilder extends Component{
    state = {
        purchasing:false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }
    
    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((sum,el)=> {
            return sum + el
        },0);

        return sum > 0;
        
    }
    
    purchaseHandler = ()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }
        else{
            this.props.onSetAuthRedirectpath('/checkout');
            this.props.history.push('/auth');
        }
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        /*
        Before Redux 
            const queryParams = [];
            for(let i in this.state.ingredients){
                queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
            }
            queryParams.push('price='+this.state.totalPrice);
            const queryString = queryParams.join('&');
            this.props.history.push({
                pathname:'/checkout',
                search: `?${queryString}`
            });
        */
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let orderSummary = null;
        let burger = this.props.error?(<p>Ingredients can't be loaded!</p>):(<Spinner />);
        if(this.props.ings){
            burger = (<Aux>
                        <Burger ingredients = {this.props.ings} />
                        <BuildControls 
                            ingredientAdded = {this.props.onIngredientAdded}
                            ingredientRemoved = {this.props.onIngredientRemoved}
                            disabled = {disabledInfo} 
                            price = {this.props.price}
                            purchasable = {this.updatePurchaseState(this.props.ings)}
                            ordered = {this.purchaseHandler}
                            isAuth = {this.props.isAuthenticated}
                        />
                    </Aux>);
            orderSummary = <OrderSummary   ingredients = {this.props.ings}
                                           purchaseCancelled = {this.purchaseCancelHandler}
                                           purchaseContinued = {this.purchaseContinueHandler}
                                           price = {this.props.price}
                            />
        }            
        return (
            <Aux>
                <Modal show = {this.state.purchasing}
                        modalClosed = {this.purchaseCancelHandler}    
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => ({
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error,
    isAuthenticated:state.auth.token!==null
})

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved:(ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onSetAuthRedirectpath: (path) => dispatch(authActions.setAuthRedirectPath(path))
})


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));

// withErrorHandler distributes all the props,also the one provided by connect