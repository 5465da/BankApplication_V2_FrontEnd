import React from 'react';
import Login from './components/Login/login'
import ForgetPass from './components/Login/forgetPass'
import ResetPass from './components/Login/resetPass'
import ChangePass from './components/Login/changePass'
import EmailSent from './components/Login/emailSent'
import Register from './components/Login/register'
import RegisterResult from './components/Login/registerResult'
import NotFound from './components/Others/notFound'
import CustDashboard from "./components/Customer/common/Dashboard";
import AdminDashboard from './components/Admin/common/Dashboard';
import Logout from './components/Login/logout'


import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import './App.css';

function App() {

  const Auth = {
    isAuthenticated: false,
    authenticate() {
      let token = sessionStorage.getItem("token");
      if (token) {
        this.isAuthenticated = true
      }
    }
  }
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <div>
      {Auth.authenticate()}
      <Route {...rest} render={(props) => (

        Auth.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
      )}
      />
    </div>
  )


  return (
    <>
   
    <Router>
      <Switch>
        <Route exact path="/"><Login /></Route>
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/Register"><Register /></Route>
        <Route exact path="/forgetpassword"><ForgetPass /></Route>
        <Route exact path="/reset/:token"><ResetPass /></Route>
        <Route exact path="/emailSent"><EmailSent /></Route>
        <Route exact path="/reset"><ChangePass /></Route>
        <Route exact path="/registerResult"><RegisterResult /></Route>
        <PrivateRoute path='/Admin' component={AdminDashboard} />
        <PrivateRoute  path="/Customer" component={CustDashboard} />
        <Route exact path="/logout"><Logout /></Route>
        <Route path='*' exact component={NotFound} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
