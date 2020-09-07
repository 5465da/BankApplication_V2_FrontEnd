import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../css/OneTimeTransfer.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { storeInput } from "../../../redux/actions/mobilePayment_storeInput";
import { useHistory } from "react-router-dom";
import axios from "axios";



export default function BodyContainer() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormInputs = () => {
    if (amount !== "" && Object.keys(creditCard).length !== 0 && phoneNumber !== "") {
      dispatch(storeInput(phoneNumber, amount, creditCard));
      history.push("/Customer/MobilePayment/ConfirmationPage");
    } else alert("Please fill in the form");
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [creditCard, setCreditCard] = useState({});
  const [visible, setVisible] = useState("hidden");
  const [nextButton, setNextButton] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
   axios
     .get("http://localhost:8083/creditcard", {
      headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
     })
     .then((response) => {
       if(response.data != "no data"){
        setCards(response.data);
       }
      
     })
     .catch(err => console.log(err))
    
  },[cards])

  const handleAmount = (value) => {
    if (value > creditCard.balance) {
      setVisible("visible");
      setNextButton(true);
    } else {
      setVisible("hidden");
      setNextButton(false);
    }
   }

  const handleCreditCard = (e) => {
    cards.map((creditcard) => {
      if (creditcard.card_type === e.target.value) {
        setCreditCard(creditcard);
        if (amount > creditcard.balance) {
          setVisible("visible");
          setNextButton(true);
        } else {
          setVisible("hidden");
          setNextButton(false);
        }
      }
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

    errorMessage: {
      visibility: visible,
    },

    nextButton: {
      marginTop: "100px",
      width: "260px",
      backgroundColor: "#e26448",
      color: "white",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#e26448",
      },
      fontSize: "1.25em"
    },
  }));

  const classes = useStyles();

  const formTo = (
    <div className="toForm">
      <h1>To</h1>
      <div>
        <TextField
          required
          className={classes.textBoxMargin}
          id="phoneNumberInput"
          label="Phone Number"
          type="number"
          value={phoneNumber}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 8);
          }}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <TextField
          required
          className={classes.textBoxMargin}
          id="amountInput"
          label="Amount"
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
            handleAmount(e.target.value);
          }}
        />
      </div>
    </div>
  );

  const formFrom = (
    <div className="fromForm">
      <h1>From</h1>
      <div>
        <FormControl variant="filled" className={classes.formControl}>
          <Select
            labelId="selectCreditCard"
            id="selectCreditCard"
            onChange={(e) => handleCreditCard(e)}
          >
            {cards.map((obj) => (
              <MenuItem value={obj.card_type} key={obj.card_type}>
                {obj.card_type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <p>Current Balance</p>
      <p>${creditCard.balance}</p>
      <p className={classes.errorMessage + " errorMessage"}>
        Please type in an amount less than the balance amount
      </p>
      <Button
        className={classes.nextButton}
        variant="contained"
        onClick={() => handleFormInputs()}
        disabled={nextButton}
      >
        Next
      </Button>
    </div>
  );
  return (
    <>
       <Grid container direction="row" justify="space-evenly" wrap="wrap">
      <Grid item sm={10} className={classes.gridMargin + " billPayment"}>
        <h1>Bill Payment</h1>
      </Grid>
      <Grid
        item
        sm={6}
        className={classes.gridMargin + " border"}
      >
        {formTo}
      </Grid>
      <Grid item sm={6} className={classes.gridMargin + " border"}>
        {formFrom}
      </Grid>
    </Grid>
    </>
  );
}
