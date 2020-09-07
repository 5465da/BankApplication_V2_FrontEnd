import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import LinearProgress from '@material-ui/core/LinearProgress'

import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "absolute",
    },
    links: {
        textDecoration: "none",
        fontFamily: ["Avenir Heavy", "Arial", "sans serif"],
        color: "#173A77",
        fontWeight: "700",
        fontSize: "1.5rem",
    },
    deselect: {
        textDecoration: "none",
        fontFamily: ["Avenir Heavy", "Arial", "sans serif"],
        color: "#606E87",
        fontWeight: "700",
        fontSize: "1.5rem",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontFamily: ["Avenir Heavy", "Arial", "sans serif"],
        color: "#AA3A21",
        fontSize: "2.5rem",
        fontWeight: "700",
        fontStyle: "italic",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        color: "black",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#AA3A21",
        fontFamily: ["Avenir Heavy", "Arial", "sans serif"],
        color: "#fff",
        "&:hover": {
            backgroundColor: "#AA3A21",
        },
    },
    forgetButton: {
        color: "#173A77",
        fontStyle: "bold",
    },
    link: {
        textDecoration: "none",
    },
  
}));

export default function SignInSide() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [loading,setLoad] = useState(false)

    const submit = (e) => {
        e.preventDefault();
        setError(false);
        setOpen(false);
        setLoad(true);

        axios.post('http://localhost:8083/signin', {
            headers: {
                'Content-Type': 'application/json'
            },
            email: email,
            password: pass
        })
            .then((res) => {
                if (res.data.account_status === 'Active') {
                    let role = res.data.role;
                    switch (role) {
                        case "USER":
                            sessionStorage.setItem("token", res.data.token);
                            window.location.href = '/Customer'
                            break;
                        case "ADMIN":
                            sessionStorage.setItem("token", res.data.token);
                            window.location.href = '/Admin'
                            break;
                        default:
                            break;
                    }
                }
                else {
                    setMessage("Account Pending for approval");
                    setOpen(true);
                    setLoad(false);
                }
            })
            .catch(function (error) {
                const info = error.response;
                if (info !== undefined) {
                    if (info.data.message === 'Bad credentials') {
                        setError(true);
                        setLoad(false);
                    }
                    else if (info.data !== undefined) {
                        setMessage(error.response.data.message);
                        setOpen(true);
                        setLoad(false);
                    }
                    else {
                        setMessage("Internal Error" + error.response.status);
                        setOpen(true);
                        setLoad(false);
                    }
                }
                else {
                    console.log(error)
                    setLoad(false);
                }

            });
    };

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
                            <a href="/login" className={classes.links}>
                                LOGIN
              </a>
                        </Box>
                        <Box p={5}>
                            <a href="/register" className={classes.deselect}>
                                REGISTER
              </a>
                        </Box>
                    </Box>
                    <form className={classes.form} onSubmit={submit}>
                        <Collapse in={open}>
                            <Alert
                                severity="warning"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                {message}
                            </Alert>
                        </Collapse>
                        <TextField
                            margin="normal"
                            type="email"
                            required
                            fullWidth
                            id="Email"
                            label="Email"
                            name="Email"
                            autoFocus
                            value={email}
                            InputLabelProps={{
                                style: {
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    width: "100%",
                                    color: "#173A77",
                                },
                            }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError(false);
                                setOpen(false);
                            }}
                            error={!!error}
                            helperText={error ? "Incorrect Username or password" : ""}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={pass}
                            InputLabelProps={{
                                style: {
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    width: "100%",
                                    color: "#173A77",
                                },
                            }}
                            onChange={(e) => {
                                setPass(e.target.value);
                                setError(false);
                                setOpen(false);
                            }}
                            error={!!error}
                            
                        />
                        <div align="center">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Login    
              </Button>
              <Collapse in={loading}>
                                <LinearProgress /><br></br>
                        </Collapse> 
                        </div>
                        <Grid container align="center">
                            <Grid item xs>
                                <Link
                                    href="/forgetpassword"
                                    variant="body2"
                                    className={classes.forgetButton}
                                >
                                    Forgot password?
                </Link>
                            </Grid>
                        
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}