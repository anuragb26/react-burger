import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Wrapper';

const sideDrawer = (props) => {
    let attachedClasses = [Classes.Sidedrawer,Classes.Close]
    if(props.open){
        attachedClasses = [Classes.Sidedrawer,Classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")} onClick = {props.closed}>
                <div className={Classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;