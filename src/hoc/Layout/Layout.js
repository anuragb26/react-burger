import React,{Component} from 'react';
import Aux from '../Wrapper';
import classes from './Layout.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer:false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer:false
        })
    }

    sideDrawerToggleHandler = ()=>{

        this.setState((prevState) => {
            return ({
                showSideDrawer:!prevState.showSideDrawer
            })
        })

    }


    render(){
        return(
                <Aux>
                    <ToolBar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
                    <SideDrawer open={this.state.showSideDrawer}
                                closed={this.sideDrawerClosedHandler} />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </Aux>
        )
    }

};

export default Layout;