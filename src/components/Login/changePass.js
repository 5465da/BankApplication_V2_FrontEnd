import React, { useEffect } from 'react';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
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
  bodytxt2: {
    color: '#AA3A21',
    fontFamily: [
      'Avenir Medium',
      'sans serif',
    ],
  },
}));

export default function ChangePass() {
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
          <CheckSharpIcon style={{ color: '388e3c', fontSize: 120 }} />

          <Typography id="change1" component="h1" variant="h4" className={classes.title}>
            Password successfully reset!
          </Typography>
          <Typography id="change2" component="h2" variant="h6" className={classes.bodytxt}>
            You will receive an email regarding this update.
          </Typography>
          <Typography id="change3" component="h2" variant="h6" className={classes.bodytxt}>
            <Link href="/Login" className={classes.bodytxt2}>Click here if are not redirected after a few seconds</Link>
          </Typography>
        </div>
      </Container>

    </div>
  );
}