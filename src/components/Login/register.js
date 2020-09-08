import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress'
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from '@material-ui/core/styles';
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
  deselect: {
    textDecoration: 'none',
    fontFamily: ['Avenir Heavy', 'Arial', 'sans serif'],
    color: '#606E87',
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: 'black',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#AA3A21',
    fontFamily: ['Avenir Heavy', 'Arial', 'sans serif'],
    color: '#fff',
    '&:hover': {
      backgroundColor: '#AA3A21',
    },
  },
  forgetButton: {
    color: 'black',
    fontStyle: 'bold',
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function Register() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfmPassword, setCnfmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorEmail, setEmailError] = useState(false);
  const [loading, setLoad] = useState(false)

  const registerUser = (e) => {
    e.preventDefault();
    if (cnfmPassword !== password) {
      return;
    }
    setLoad(true)
    axios.post('http://localhost:8083/register', {
      name,
      email,
      password,
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          if (res.data === 'Account Registered') {
            console.log(res.data)
            window.location.href = '/registerResult'
          }
          else {
            setEmailError(true);
            setLoad(false)
          }
        }
      })
      .catch(function (error) {
        setError(true);
        setLoad(false)
        if (error.response !== undefined) {
          alert('Registration failed reason:' + error.response.data.errors[0].defaultMessage);
        }
      });
  };

  useEffect(() => {
    (cnfmPassword !== password) ? setError(true) : setError(false);
  }, [cnfmPassword, password]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <a href="/" className={classes.link}>
            <h1 className={classes.title}>Optimum DigiBank</h1>
          </a>
          <Box display="flex" p={1} bgcolor="background.paper">
            <Box p={5}>
              <a href="/login" className={classes.deselect}>LOGIN</a>
            </Box>
            <Box p={5}>
              <a href="/register" className={classes.links}>REGISTER</a>
            </Box>
          </Box>
          <form className={classes.form} onSubmit={registerUser}>
            <TextField
              inputProps={{ pattern: '[A-Za-z ]+', title: 'Letters characters only' }}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              InputLabelProps={{
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  width: '100%',
                  color: '#173A77',
                },
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              name="email"
              label="Email Address"
              id="email"
              autoComplete="email"
              InputLabelProps={{
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  width: '100%',
                  color: '#173A77',
                },
              }}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}

              error={!!errorEmail}
              helperText={errorEmail ? 'Email already registered! Please try a different email' : ''}
            />
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
              helperText={error ? 'Password not the same' : ''}
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
              InputLabelProps={{
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  width: '100%',
                  color: '#173A77',
                },
              }}
              onChange={(e) => {
                setCnfmPassword(e.target.value);
              }}
              helperText={error ? 'Password not the same' : ''}
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
                Sign Up
              </Button>
              <Collapse in={loading}> <LinearProgress /></Collapse>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}