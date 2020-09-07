import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../Overview/Overview.css";
import { store } from "../../../index";
import { BrowserRouter as  Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function ApplyCreditcardSubmit() {
  const state = store.getState();
  const classes = useStyles();
  const referenceNum = "1234567";
  const creditcardName = state.applyCreditcard.creditcardName;
  const creditcardType = state.applyCreditcard.selectedCardType;


  const [custEmail, setCustEmail] = useState();

  useEffect(() => {
    axios
    .get("http://localhost:8083/cardstatus", {
      headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
    })
    .then((res) => {
      if(res.data === 'no data'){
        return;
      }
      else{
        setCustEmail(res.data[0].email);
      }
    })
    .catch((error) => console.log(error));

  }, []);

  const handleChange = () => {
    window.location.href = "/Customer";
  };

  const applyCC = () => {
    //selected creditcard type is not in DB (Apply new CC)
    var config = {
      method: 'post',
      url: 'http://localhost:8083/applycard',
      headers: { 
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data : JSON.stringify({"card_type": creditcardType})
    };
    
    axios(config)
    .then(function (response) {
      window.location.href = "/Customer/apply-creditcard/creditcard-confirm";
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <React.Fragment>
      <main className="content">
        <div className={classes.appBarSpacer} />
        <Container maxWidth="md" className="container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2 className="darkRedColor">Credit Card Application</h2>
              <p className="darkBlueColor">Ref No.: {referenceNum}</p>
              <p className="darkBlueColor">{creditcardName}</p>
              <p className="darkBlueColor">{custEmail}</p>
            </Grid>
          </Grid>
            <Button variant="contained" id="cardApplyBtn" onClick={applyCC}>
              Apply
            </Button>
          <Link to="/">
            <Button
              variant="contained"
              id="cardCancelBtn"
              onClick={handleChange}
            >
              Cancel
            </Button>
          </Link>
        </Container>
      </main>
    </React.Fragment>
  );
}
