import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  paper: {
    marginTop: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#173A77',
    fontFamily: [
      'Avenir Heavy',
      'sans serif',
    ],
  },
  bodytxt: {
    color: '#173A77',
    fontFamily: [
      'Avenir Medium',
      'sans serif',
    ],
  },
}));

export default function Logout() {
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/Login";
    }, 1500);
  })

  return (
    <div className={classes.root}>
      <Container id="logout" component="main" maxWidth="sm">

        <div className={classes.paper}>
          <Typography id ="Logout1" component="h1" variant="h2" className={classes.title}>
            Logout
          </Typography>
          <Typography id ="Logout2" component="h2" variant="h6" className={classes.bodytxt}>
            Thank you for banking with us!
          </Typography>
          <Typography id ="Logout3" component="h2" variant="h6">
            <Link href="/Login" className={classes.bodytxt}>Click here if are not redirected after a few seconds</Link>
          </Typography>
        </div>

      </Container>

    </div>
  );
}