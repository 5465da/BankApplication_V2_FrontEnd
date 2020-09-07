import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import "../Overview/Overview.css";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function CreditCardStatus() {
  const classes = useStyles();
  const [creditcards, setcreditcards] = useState([]);
  const [creditCardId, setCreditCardId] = useState("Null");
  const [creditCardStatus, setCreditCardStatus] = useState("");

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
          setcreditcards(res.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChangeCC = (e) => {
    setCreditCardId(creditcards[e.target.value].card_id);
    setCreditCardStatus(creditcards[e.target.value].card_status);
  };

  return (
    <main className="content">
      <div className={classes.appBarSpacer} />
      <Container maxWidth="md" className="container">
        <Grid container spacing={3}>
          {/* Select CreditCard Dropdown */}
          <Grid item xs={6}>
            <Paper className="selectCreditCardPaper" elevation={3}>
              <FormControl variant="filled" className="formControl">
                <InputLabel htmlFor="creditCardSelect">
                  Select CreditCard
                </InputLabel>
                <Select
                  className="creditCardDd"
                  native
                  onChange={handleChangeCC}
                >
                  <option value="0"></option>
                  {creditcards.map((creditcard, index) => (
                    <option value={index} key={creditcard.card_id}>
                      {creditcard.card_type}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2 className="darkBlueColor">Credit Card Status</h2>
            <p className="darkBlueColor">Ref No.: {creditCardId}</p>
            <p className="darkBlueColor">
              {creditCardId === "Null" ? "Please select a credit card." : ""}
              {creditCardStatus === "Active"
                ? "Your credit card has been approved. Thank you."
                : ""}
              {creditCardStatus === "Rejected"
                ? "Your credit card application has been declined. Thank you."
                : ""}
              {creditCardStatus === "Pending"
                ? "Your credit card is pending for approval. Thank you."
                : ""}
            </p>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
