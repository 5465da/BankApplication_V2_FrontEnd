import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import ApprovalStatus from './ApprovalStatus';

export default function ApprovalStatusRoute() {
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
              path="/Admin/approvalstatus"
              component={ApprovalStatus}
            />
          </Switch>
        </main>
      </Router>
    </div>
  );
}
