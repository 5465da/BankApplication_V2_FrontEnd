import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import CreditCardApprove from "./CreditCardApprove";

export default function CreditCardUpdateRoute() {
  const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
  }));

  const classes = useStyles();
  
  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <Router>
        <main className="content">
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route
              exact
              path="/Admin/creditcardapprove"
              component={CreditCardApprove}
            />
          </Switch>
        </main>
      </Router>
    </div>
  );
}
