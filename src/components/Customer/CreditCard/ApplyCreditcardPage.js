import React, { useEffect,useState } from "react";
import axios from "axios";
import styles from "./css/ApplyCreditcard.module.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import image from "../images/creditcard-01.png";
import image1 from "../images/creditcard-02.png";
import image2 from "../images/creditcard-03.png";
import image3 from "../images/creditcard-04.png";
import image4 from "../images/creditcard-05.png";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { storeInput } from "../../redux/actions/applyCreditcard_storeInput";
import { BrowserRouter as Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

export default function ApplyCreditCardPage() {
  const dispatch = useDispatch();

  const history = useHistory();
  const classes = useStyles();
  const [customerCardTypes, setCustomerCardTypes] = useState([]);
  
  var arr = [];
  
  useEffect(() => {
    axios
    .get("http://localhost:8083/cardstatus", {
      headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
    })
    .then((res) => {
      if(res.data !== 'no data'){
        let test = res.data;
        test.map((creditcard) => {
          arr.push(creditcard.card_type);
          setCustomerCardTypes([...arr]);
          return null;
        });
      }
    })
    .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, []);

  const handlecard_Silver = () => {
    dispatch(storeInput("", "Silver"));
    history.push("/Customer/apply-creditcard/creditcard-name");
  };

  const handlecard_Gold = () => {
    dispatch(storeInput("", "Gold"));
    history.push("/Customer/apply-creditcard/creditcard-name");
  };

  const handlecard_Platinum = () => {
    dispatch(storeInput("", "Platinum"));
    history.push("/Customer/apply-creditcard/creditcard-name");
  };

  const handlecard_Women = () => {
    dispatch(storeInput("", "Women"));
    history.push("/Customer/apply-creditcard/creditcard-name");
  };

  const handlecard_Student = () => {
    dispatch(storeInput("", "Student"));
    history.push("/Customer/apply-creditcard/creditcard-name");
  };

  return (
    <React.Fragment>
      <main className="content">
        <div className={classes.appBarSpacer} />
        <Container maxWidth="md" className="container">
          <p className={styles.FormTitle}>Credit Card Application</p>
          <Grid container spacing={3}>
            {/* Creditcard Image */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccDescription}>
              <img className={styles.ccImage} src={image} alt={image}/>
            </Grid>
            {/* Creditcard Description */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccDescription}>
              <h3 className={styles.PBVisaSilverCreditCard}>
                PB Visa Silver CreditCard
              </h3>
              <p className={styles.TitleContainer1}>
                5% interest rate<br></br>
                Eligibility Criteria: $35k Per Annum<br></br>
                Credit Limit: $1000.00<br></br>
                Enjoy great rebate and rewards with the Silver Creditcard
              </p>
            </Grid>
            {/* Select Button */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccSelectDiv}>
              {customerCardTypes.indexOf("Silver") === -1 ? (
                <Link
                  to="/Customer/apply-creditcard/creditcard-name"
                  className={styles.ccLink}
                >
                  <Button
                    className={styles.ccSelectBtn}
                    variant="contained"
                    value="Silver"
                    onClick={handlecard_Silver}
                  >
                    Select
                  </Button>
                </Link>
              ) : (
                <Button
                  className={styles.ccSelectBtn}
                  variant="contained"
                  value="Silver"
                  onClick={handlecard_Silver}
                  disabled
                >
                  Select
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Creditcard Image */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccDescription}>
              <img className={styles.ccImage} src={image1} alt={image1}/>
            </Grid>
            {/* Creditcard Description */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccDescription}>
              <h3 className={styles.PBVisaSilverCreditCard}>
                PB Visa Gold CreditCard
              </h3>
              <p className={styles.TitleContainer1}>
                The Premium Gold Creditcard is here for you<br></br>
                With 2.5% interest rate and $7000.00 Credit Limit your purchases
                are swift and easy.
                <br></br>
                Eligibility Criteria:$45k Per Anum
              </p>
            </Grid>
            {/* Select Button */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccSelectDiv}>
              {customerCardTypes.indexOf("Gold") === -1 ? (
                <Link
                  to="/Customer/apply-creditcard/creditcard-name"
                  className={styles.ccLink}
                >
                  <Button
                    className={styles.ccSelectBtn}
                    variant="contained"
                    value="Gold"
                    onClick={handlecard_Gold}
                  >
                    Select
                  </Button>
                </Link>
              ) : (
                <Button
                  className={styles.ccSelectBtn}
                  variant="contained"
                  value="Gold"
                  onClick={handlecard_Gold}
                  disabled
                >
                  Select
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Creditcard Image */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccDescription}>
              <img className={styles.ccImage} src={image2} alt={image2}/>
            </Grid>
            {/* Creditcard Description */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccDescription}>
              <h3 className={styles.PBVisaSilverCreditCard}>
                PB Visa Platinum CreditCard
              </h3>
              <p className={styles.TitleContainer1}>
                1.2% interest rate<br></br>
                Eigibility Criteria: $70k Per Annum<br></br>
                Credit Limit: $10000.00<br></br>
                Enjoy greater rebate and rewards with the Platinum Card
              </p>
            </Grid>
            {/* Select Button */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccSelectDiv}>
              {customerCardTypes.indexOf("Platinum") === -1 ? (
                <Link
                  to="/Customer/apply-creditcard/creditcard-name"
                  className={styles.ccLink}
                >
                  <Button
                    className={styles.ccSelectBtn}
                    variant="contained"
                    value="Platinum"
                    onClick={handlecard_Platinum}
                  >
                    Select
                  </Button>
                </Link>
              ) : (
                <Button
                  className={styles.ccSelectBtn}
                  variant="contained"
                  value="Platinum"
                  onClick={handlecard_Platinum}
                  disabled
                >
                  Select
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Creditcard Image */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccDescription}>
              <img className={styles.ccImage} src={image3} alt={image3}/>
            </Grid>
            {/* Creditcard Description */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccDescription}>
              <h3 className={styles.PBVisaSilverCreditCard}>
                PB Visa Women CreditCard
              </h3>
              <p className={styles.TitleContainer1}>
                We appreciate you, and we honour you.<br></br>
                The Women Credit Card is for every Woman.
              </p>
            </Grid>
            {/* Select Button */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccSelectDiv}>
              {customerCardTypes.indexOf("Women") === -1 ? (
                <Link
                  to="/Customer/apply-creditcard/creditcard-name"
                  className={styles.ccLink}
                >
                  <Button
                    className={styles.ccSelectBtn}
                    variant="contained"
                    value="Women"
                    onClick={handlecard_Women}
                  >
                    Select
                  </Button>
                </Link>
              ) : (
                <Button
                  className={styles.ccSelectBtn}
                  variant="contained"
                  value="Women"
                  onClick={handlecard_Women}
                  disabled
                >
                  Select
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Creditcard Image */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccDescription}>
              <img className={styles.ccImage} src={image4} alt={image4}/>
            </Grid>
            {/* Creditcard Description */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccDescription}>
              <h3 className={styles.PBVisaSilverCreditCard}>
                PB Visa Student CreditCard
              </h3>
              <p className={styles.TitleContainer1}>
                With 2.5% low interest rate and an Eligibility Criteria of $22k
                Per Annum<br></br>
                Enjoy rewarding rebates with every tap.
              </p>
            </Grid>
            {/* Select Button */}
            <Grid item xs={12} md={4} lg={4} className={styles.ccSelectDiv}>
              {customerCardTypes.indexOf("Student") === -1 ? (
                <Link
                  to="/Customer/apply-creditcard/creditcard-name"
                  className={styles.ccLink}
                >
                  <Button
                    className={styles.ccSelectBtn}
                    variant="contained"
                    value="Student"
                    onClick={handlecard_Student}
                  >
                    Select
                  </Button>
                </Link>
              ) : (
                <Button
                  className={styles.ccSelectBtn}
                  variant="contained"
                  value="Student"
                  onClick={handlecard_Student}
                  disabled
                >
                  Select
                </Button>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
