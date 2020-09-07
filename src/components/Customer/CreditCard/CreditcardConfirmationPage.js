import React from "react";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import Container from "@material-ui/core/Container";
import styles from "./css/ConfirmationPage.module.css";
import { makeStyles } from "@material-ui/core/styles";
import "../Overview/Overview.css";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function ConfirmationPage() {
  const classes = useStyles();
  return (
      <main className="content">
        <div className={classes.appBarSpacer} />
        <Container maxWidth="md" className="container">
          <div className={styles.ccConfirmDiv}>
            <CreditCardIcon className={styles.creditcardSuccessIcon} />
            <h1 className={styles.confirmHeader}>Thank you for applying!</h1>
            <p className={styles.confirmMsg}>Your credit card application is in the midst of process.<br></br>Please kindly wait for us to get back to you.</p>
            <p className={styles.confirmMsg}>
              If you need any assitance you may contact us at <span className="darkRedColor">1800 1234 5678</span>
            </p>
          </div>
        </Container>
      </main>
  );
}
