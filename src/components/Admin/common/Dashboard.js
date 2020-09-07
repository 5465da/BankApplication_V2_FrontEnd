import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import UserMenu from "../common/Overview/UserMenu";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import "../common/Overview/Overview.css";

import OverviewPage from "../common/Overview/OverviewPage";
import ApprovalRoute from '../ApproveStatus/ApprovalStatusRoute';
import CreditCardUpdate from '../CreditCardApproval/CreditCardUpdateRoute';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";

import axios from 'axios'

export default function Dashboard2() {
  const [name, setName] = useState();

  useEffect(() => {
    auth();
  }, [])

  const auth = () => {
    axios.get("http://localhost:8083/adminDashboard", {
      headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
    })
      .then((response) => {
         setName(response.data);
      })
      .catch(() => {
        sessionStorage.clear()
        window.location.href = 'http://localhost:3000/login'
      })
  }
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" className="appBar">
          <Toolbar className="toolbar">
            <div className="space" />
            <UserMenu name={name} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: "drawerPaperx",
          }}
        >
          <Typography component="p" variant="h6" className="digiBankText">
            Optimum DigiBank
          </Typography>

          <List>
            <NavLink
              className="navlink"
              activeClassName="activeNavlink"
              exact
              to="/Admin"
            >
              <HomeIcon className="iconPadding" />
              <ListItemText primary="Overview" />
            </NavLink>

            <NavLink
              className="navlink"
              activeClassName="activeNavlink"
              to="/Admin/approvalstatus"
            >
              <DescriptionIcon className="iconPadding" />
              <ListItemText primary="Approval Status" />
            </NavLink>
            <NavLink
              className="navlink"
              activeClassName="activeNavlink"
              to="/Admin/creditcardapprove"
            >
              <CreditCardIcon className="iconPadding" />
              <ListItemText primary="Credit Card Status" />
            </NavLink>
          </List>
        </Drawer>

        <Switch>
          <Route exact path="/Admin" component={OverviewPage}></Route>
          <Route
            path="/Admin/approvalstatus"
            component={ApprovalRoute}
          />
          <Route
            path="/Admin/creditcardapprove"
            component={CreditCardUpdate}
          />

        </Switch>
      </div>
    </Router>
  );
}
