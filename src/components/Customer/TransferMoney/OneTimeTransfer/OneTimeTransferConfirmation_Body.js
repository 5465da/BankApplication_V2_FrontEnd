import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../css/OneTimeTransfer.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { store } from "../../../../index";
import axios from "axios";

export default function BodyContainer() {
  const state = store.getState();
  
  const handleSubmit = () => {
    var config = {
      method: 'post',
      url: 'http://localhost:8083/payment',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ "payment_type": "Transfer", "card": state.transfer.creditCard.card_id, "payment_amount": state.transfer.amount })
    };

    axios(config)
      .then(function (response) {
        window.location.href = "/Customer/Payment/Successful";
      })
      .catch(function (error) {
        window.location.href = "/Customer/Payment/Unsuccessful";
      });
  };

  const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,

    gridMargin: {
      marginTop: theme.spacing(1),
    },

    textBoxMargin: {
      marginTop: theme.spacing(5),
    },

    formControl: {
      marginTop: theme.spacing(8),
      minWidth: 240,
    },
  }));

  const classes = useStyles();

  const formTo = (
    <div className="toForm toFormConfirmation">
      <h1>To</h1>
      <p>Account Number: {state.transfer.accountNumber}</p>
      <p>$ {state.transfer.amount}</p>
    </div>
  );

  const formFrom = (
    <div className="fromForm fromFormConfirmation">
      <h1>From</h1>
      <p>{state.transfer.creditCard.card_type}</p>
      <div>
        <Button
          id="submitButton"
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>
      <div>
        <Button
          id="cancelButton"
          variant="contained"
          onClick={() =>
            (window.location.href = "/Customer/Payment/Unsuccessful")
          }
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <main className="content">
      <div className={classes.appBarSpacer} />
      <Grid container direction="row" justify="space-evenly" wrap="wrap">
        <Grid item sm={10} className={classes.gridMargin + " billPayment"}>
          <h1>Bill Payment Details</h1>
        </Grid>
        <Grid
          item
          sm={6}
          direction="row"
          className={classes.gridMargin + " border"}
        >
          {formTo}
        </Grid>
        <Grid item sm={6} className={classes.gridMargin + " border"}>
          {formFrom}
        </Grid>
      </Grid>
    </main>
  );
}
