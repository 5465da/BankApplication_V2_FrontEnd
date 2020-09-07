import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../css/OtherRecipients.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function BodyContainer() {
  const history = useHistory();

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

  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const handleSavePayee = () => {
    if (name !== undefined && phoneNumber !== undefined) {
      var config = {
        method: 'post',
        url: 'http://localhost:8083/addpayees',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({ "name": name, "number": phoneNumber, "payees_type": "MobileBill" })
      };

      axios(config)
        .then(function (response) {
           history.push("/Customer/MobilePayment/");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else alert("Please complete the form!");
  };

  const classes = useStyles();

  const formTo = (
    <div className="toForm">
      <h1>To</h1>
      <div>
        <Select native={true} onChange={e => setName(e.target.value)}>
          <option value=""> </option>
          <option value="Singtel">Singtel</option>
          <option value="Starhub">Starhub</option>
          <option value="M1">M1</option>
        </Select>
      </div>
      <div>
        <TextField
          required
          className={classes.textBoxMargin}
          id="phoneNumberInput"
          label="Phone Number"
          type="number"
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 8);
          }}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </div>
    </div>
  );
  return (
    <main className="content">
      <div className={classes.appBarSpacer} />
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
        <Grid
          item
          sm={6}
          className={classes.gridMargin + " border"}
        >
          <div className="buttonContainer">
            <div>
              <Button
                id="savePayeeButton"
                variant="contained"
                onClick={() => handleSavePayee()}
              >
                Save Payee
              </Button>
            </div>
            <div>
              <Button
                id="cancelButton"
                variant="contained"
                onClick={() =>
                  history.push("/Customer/MobilePayment/OtherRecipients")
                }
              >
                Cancel
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </main>
  );
}
