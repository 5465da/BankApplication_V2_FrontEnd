import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./css/OneTimeTransfer.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import OtherRecipients_FormBody from "./OtherRecipients/OtherRecipients_Body";
import OtherRecipients_PayeeListBody from "./OtherRecipients/OtherRecipients_PayeeList";
import OtherRecipients_AddPayeeBody from "./OtherRecipients/OtherRecipients_AddPayee";
import MobilePaymentConfirmationBody from "./OneTimeTransfer/OneTimeTransferConfirmation_Body";

export default function MobilePaymentRoutes() {
  const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
  }));

  const classes = useStyles();
  
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Router>
        <main className="content">
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route
              exact
              path="/Customer/MobilePayment/"
              component={OtherRecipients_PayeeListBody}
            />
            <Route
              path="/Customer/MobilePayment/AddPayee"
              component={OtherRecipients_AddPayeeBody}
            />
            <Route
              path="/Customer/MobilePayment/OtherRecipients/Form"
              component={OtherRecipients_FormBody}
            />
            <Route
              path="/Customer/MobilePayment/ConfirmationPage"
              component={MobilePaymentConfirmationBody}
            />
          </Switch>
        </main>
      </Router>
    </div>
  );
}
