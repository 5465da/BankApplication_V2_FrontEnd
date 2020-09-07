import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./css/OneTimeTransfer.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import OneTimeTransferBody from "./OneTimeTransfer/OneTimeTransfer_Body";
import TaxPaymentConfirmationBody from "./OneTimeTransfer/OneTimeTransferConfirmation_Body";

export default function TaxPaymentRoutes() {
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
              path="/Customer/TaxPayment"
              component={OneTimeTransferBody}
            />
            <Route
              path="/Customer/TaxPayment/ConfirmationPage"
              component={TaxPaymentConfirmationBody}
            />
          </Switch>
        </main>
      </Router>
    </div>
  );
}
