import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../css/OtherRecipients.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InfoIcon from "@material-ui/icons/Info";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storePayee } from "../../../redux/actions/mobilePayment_storeInput";
import { useHistory} from "react-router-dom";

export default function BodyContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [payeeList,setPaylist] = useState([]);
  
  useEffect(() => {
    axios
      .get(`http://localhost:8083/getmobilepayees`,{
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token'),}
      })
      .then((response) => {
        setPaylist(response.data)
      })
      .catch((error) => console.log(error));
  },[]);

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

  const handleOnClick = (event) => {
    payeeList.map((obj) => {
      if (obj.id === event.target.id) {
        dispatch(storePayee(obj));
      }
      return null
    });
    history.push("/Customer/MobilePayment/OtherRecipients/Form");
  };

  return (
    <div>
      <Grid container direction="row" justify="space-evenly" wrap="wrap">
        <Grid item sm={10} className={classes.gridMargin + " billPayment"}>
          <h1>Bill Payment</h1>
        </Grid>
        <Grid item sm={12}>
          {payeeList.map((obj) => (
            <Paper
              elevation={3}
              id={obj.id}
              key={obj.id}
              className="paperHeight"
              onClick={(e) => handleOnClick(e)}
            >
              <span>{obj.name}</span>
              <br />
              <br />
              <span>Mobile Bill</span>
              <InfoIcon className="infoIcon" />
            </Paper>
          ))}
        </Grid>
      </Grid>
      <a href="/Customer/MobilePayment/AddPayee">
        <Button id="addPayee" variant="contained">
          Add Payee
        </Button>
      </a>
    </div>
  );
}
