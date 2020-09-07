import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import UserMenu from "../Overview/UserMenu";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import DescriptionIcon from "@material-ui/icons/Description";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "../Overview/Overview.css";
import MobilePaymentRoutes from "../MobilePayment/MobilePaymentRoutes";
import TransferMoneyPage from "../TransferMoney/TransferRoutes";
import OverviewPage from "../Overview/OverviewPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import { PaymentSuccessfulPage } from "../ResultPage/PaymentSuccessful";
import { PaymentUnSuccessfulPage } from "../ResultPage/PaymentUnsuccessful";
import CreditCardStatus from "../CreditCard/CreditcardStatusPage";
import ApplyCreditCardPage from "../CreditCard/ApplyCreditcardPage";
import CreditCardName from "../CreditCard/CreditcardNamePage";
import CreditCardSubmit from "../CreditCard/CreditcardSubmissionPage";
import CreditCardConfirm from "../CreditCard/CreditcardConfirmationPage";
import TaxPaymentRoutes from "../TaxPayment/TaxPaymentRoutes";
import axios from 'axios'

export default function Dashboard() {
  const [name, setName] = useState();

  useEffect(() => {
    auth();
  }, [])

  const auth = () => {
    let token = 'Bearer ' + sessionStorage.getItem('token');
    axios.get("http://localhost:8083/customerDashboard", {
      headers: { 'Authorization': token }
    })
      .then((response) => {
        setName(response.data);
      })
      .catch((err) => {
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
            <div className="space"/>
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
              to="/Customer"
            >
              <HomeIcon className="iconPadding" />
              <ListItemText primary="Overview" />
            </NavLink>

            <ListSubheader className="navSubHeader">PAYMENT</ListSubheader>

            <NavLink
              className="navlink"
              activeClassName="activeNavlink"
              to="/Customer/MobilePayment"
            >
              <PhoneIphoneIcon className="iconPadding" />
              <ListItemText primary="Mobile Bills" />
            </NavLink>

            <NavLink
              className="navlink"
              activeClassName="activeNavlink"
              to="/Customer/TransferMoney"
            >
              <SyncAltIcon className="iconPadding" />
              <ListItemText primary="Transfer Money" />
            </NavLink>

            <NavLink
              className="navlink"
              activeClassName="activeNavlink"
              to="/Customer/TaxPayment"
            >
              <DescriptionIcon className="iconPadding" />
              <ListItemText primary="Pay Tax" />
            </NavLink>
          </List>
          <Divider />
          <List>
            <ListSubheader className="navSubHeader">SERVICE</ListSubheader>

            <NavLink
              className="navlink"
              activeClassName="activeNavlink"
              to="/Customer/apply-creditcard"
            >
              <CreditCardIcon className="iconPadding" />
              <ListItemText primary="Apply for Credit Card" />
            </NavLink>

            <NavLink
              className="navlink"
              activeClassName="activeNavlink"
              to="/Customer/creditcard-status"
            >
              <NotificationsIcon className="iconPadding" />
              <ListItemText primary="Credit Card Status" />
            </NavLink>
          </List>
        </Drawer>
        {/* <main className="content">
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className="container"></Container>
      </main> */}
        <Switch>
          <Route exact path="/Customer" component={OverviewPage}></Route>
          {/* <Route path="/MobilePayment" component={OneTimeTransferBody}></Route> */}
          <Route
            path="/Customer/MobilePayment"
            component={MobilePaymentRoutes}
          />
          <Route path="/Customer/TransferMoney" component={TransferMoneyPage} />
          <Route
            path="/Customer/Payment/Successful"
            component={PaymentSuccessfulPage}
          />
          <Route
            path="/Customer/Payment/Unsuccessful"
            component={PaymentUnSuccessfulPage}
          />
          <Route
            exact
            path="/Customer/apply-creditcard"
            component={ApplyCreditCardPage}
          ></Route>
          <Route
            exact
            path="/Customer/apply-creditcard/creditcard-name"
            component={CreditCardName}
          />
          <Route
            exact
            path="/Customer/apply-creditcard/creditcard-submit"
            component={CreditCardSubmit}
          ></Route>
          <Route
            exact
            path="/Customer/apply-creditcard/creditcard-confirm"
            component={CreditCardConfirm}
          ></Route>
          <Route
            exact
            path="/Customer/creditcard-status"
            component={CreditCardStatus}
          ></Route>
          <Route
            path="/Customer/TaxPayment"
            component={TaxPaymentRoutes}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}
