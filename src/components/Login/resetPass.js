import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress'
import Collapse from "@material-ui/core/Collapse";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'absolute',
  },
  links: {
    textDecoration: 'none',
    fontFamily: ['Avenir Heavy', 'Arial', 'sans serif'],
    color: '#173A77',
    fontWeight: '700',
    fontSize: '1.5rem',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: ['Avenir Heavy', 'Arial', 'sans serif'],
    color: '#AA3A21',
    fontSize: '2.5rem',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  form: {
    width: '25rem', // Fix IE 11 issue.
    position: 'relative',
    marginTop: theme.spacing(1),
    color: 'black',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#AA3A21',
    fontFamily: ['Avenir Heavy', 'Arial', 'sans serif'],
    color: '#fff',
    width: '25rem',
    height: '3rem',
    '&:hover': {
      backgroundColor: '#AA3A21',
    },
  },
  forgetButton: {
    color: 'black',
    fontStyle: 'bold',
  },
}));

export default function ResetPass() {
  const classes = useStyles();

  const [password, setPassword] = useState('');
  const [cnfmPassword, setCnfmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [open, setOpen] = useState(false);

  const { token } = useParams();

  const resetPassword = (e) => {
    e.preventDefault();
    if (cnfmPassword !== password) {
      return;
    }
    setOpen(true);
    axios.post(`http://localhost:8083/reset/${token}`, {
      password,
    })
      .then((res) => {
        console.log(res)
        if (res.data === 'OldPass') {
          setError(true);
          setErrorText('Password cannot be the same as the old password');
          setOpen(false);
        }
        if (res.data === 'Password Reset') {
          window.location.href = '/reset';
        }
      })
      .catch((err) => {
        setOpen(false);
        console.log(err)
        alert('Password not reset. An error Occurred');
      });
  };

  useEffect(() => {
    (cnfmPassword !== password) ? setError(true) : setError(false);
    setErrorText('Password not the same');
  }, [cnfmPassword, password]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <h2 className={classes.title}>Optimum DigiBank</h2>

          <form className={classes.form} onSubmit={resetPassword}>

            <TextField
              inputProps={{ pattern: '(?=.*[A-Za-z]).{6,}', title: 'More than 6 Character Alphanumeric character only allowed!' }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  width: '100%',
                  color: '#173A77',
                },
              }}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              error={!!error}
              helperText={error ? `${errorText}` : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="retype"
              label="Retype Password"
              id="retype"
              type="password"
              autoComplete="current-password"
              onChange={(e) => {
                setCnfmPassword(e.target.value);
              }}
              helperText={error ? `${errorText}` : ''}
              error={!!error}
            />
            <div align="center">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>

              <Collapse in={open}>
                <LinearProgress /><br></br>
              </Collapse>

            </div>

            <Typography id="ResetPass1" component="h6" variant="h6" className={classes.bodytxt}>
              Click here to return to the
              {' '}
              <Link href="/Login" className={classes.bodytxt2}> Login Page </Link>
            </Typography>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}