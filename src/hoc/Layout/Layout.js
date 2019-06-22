import React, { useState } from "react";
import { connect } from "react-redux";
import Aux from "../Wrapper";
import classes from "./Layout.css";
import ToolBar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerVisible(!sideDrawerVisible);
  };

  return (
    <Aux>
      <ToolBar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuth}
        open={sideDrawerVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
