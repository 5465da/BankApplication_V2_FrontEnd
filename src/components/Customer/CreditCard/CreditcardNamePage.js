import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../Overview/Overview.css";
import { useDispatch } from "react-redux";
import { storeInput } from "../../redux/actions/applyCreditcard_storeInput";
import { store } from "../../../index";
import {
  BrowserRouter as 
  Link,
  useHistory
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function ApplyCC() {
  const dispatch = useDispatch();
  console.log(store.getState());
  const state = store.getState();
  const cardType = state.applyCreditcard.selectedCardType;
  const history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("");

  const handleFormInputs = () => {
    console.log("cardType")
    console.log(cardType)
    dispatch(storeInput(name, cardType));
    history.push("/Customer/apply-creditcard/creditcard-submit");
  };

  return (
    <React.Fragment>
      <main className="content">
        <div className={classes.appBarSpacer} />
        <Container maxWidth="md" className="container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2 className="darkRedColor">Credit Card Application</h2>
              <TextField
                id="cardName"
                label="Name to appear on card"
                size="small"
                className="cardNameInput"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Link to = "/Customer/apply-creditcard/creditcard-submit">
            <Button variant="contained" id="cardNameBtn" onClick={() => handleFormInputs()}>
              Next
            </Button>
          </Link>
        </Container>
      </main>
    </React.Fragment>
  );
}
