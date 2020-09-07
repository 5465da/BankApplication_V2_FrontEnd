import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        backgroundImage: "url(https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1636&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        backgroundPosition: "absolute",
    },
    size: {
        fontSize: '270px',
        fontFamily: ["Avenir Heavy", "Arial", "sans serif"],
        margin: theme.spacing(0, 20, 0)
    },
    space: {
        fontFamily: ["Avenir Heavy", "Arial", "sans serif"],
        fontWeight: "700",
        fontSize: "2em",
        margin: theme.spacing(0, 35, 0)
    }

}));

const backtologin = () => {
    window.location.href = '/login'
}

function NotFound() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <br></br>
              <h1><label className={classes.size}>404</label> </h1>
              <h1 className={classes.space}>Page not found   <Button onClick={backtologin}>Back</Button></h1>
        </div>
    )

}

export default NotFound
