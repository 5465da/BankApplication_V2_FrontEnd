import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress'
import Collapse from "@material-ui/core/Collapse";


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
  logo: {
    color: '#AA3A21',
    fontFamily: [
      'Avenir Heavy Oblique',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ],
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
    justifyContent: 'center',
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
    height: '3.5rem',
    backgroundColor: '#AA3A21',
    fontFamily: ['Avenir Heavy', 'Arial', 'sans serif'],
    color: '#fff',
    '&:hover': {
      backgroundColor: '#AA3A21',
    },
  },
  backButton: {
    color: '#173A77',
    fontStyle: 'bold',
  },
}));

const ForgetPass = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const getPass = (e) => {
    e.preventDefault();
    setOpen(true)
    axios.post('http://localhost:8083/forgetpassword', {
      email,
    })
      .then((res) => {
        console.log(res)
        if (res.data === 'Email Sent') {
          window.location.href = '/emailSent';
        }
        if (res.data === 'email dont exists') {
          setError(true);
          setOpen(false);
        }
      })
      .catch(() => {
        setOpen(false);
        alert('An error Occurred');
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <h1 className={classes.title}>Optimum DigiBank</h1>
                   
          <form className={classes.form} onSubmit={getPass}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(false);
                  }}
                  InputLabelProps={{
                    style: {
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      width: '100%',
                      color: '#173A77',
                    },
                  }}
                  error={!!error}
                  helperText={error ? 'Email does not exist' : ''}
                />
              </Grid>

            </Grid>
            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              type="submit"
            >
              Submit
            </Button>
            <Grid container align="center">
              <Grid item xs>
              <Collapse in={open}>
                                <LinearProgress /><br></br>
                        </Collapse> 
                <Link href="/Login" variant="body2" className={classes.backButton}>
                  Back to Login?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default ForgetPass;