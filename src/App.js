import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Admin from './components/Admin'
import Manager from './components/Manager';
import Profile from './components/Profile';
import Home from './components/Home';
import ResetPassword from './components/ResetPassword';
import Schedule from './components/Schedule';

class App extends Component {
  constructor() {
    super();

    //DEFAULT STATE OF loggedInStatus FOR USER IS "NOT_LOGGED_IN"

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  //checkLoginStatus() IS CALLED IN componentDidMount() BELOW
  //GETS LOGIN CREDENTIALS FROM MYSQL AND GIVES RESPONSE
  //CHANGES STATE OF loggedInStatus TO "LOGGED_IN" WITH SUCCESSFUL LOGIN
  //STATE OF loggedInStatus REMAINS "NOT_LOGGED_IN" IF UNSUCCESSFUL

  checkLoginStatus() {
    axios
      .get("/api/users/login")
      .then(response => {
        if (
          response.data.logged_in && //IF logged_in IS TRUE
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN", //loggedInStatus CHANGES TO "LOGGED_IN" IF logged_in IS TRUE
            user: response.data.user
          });
        } else if (
          !response.data.logged_in & //IF logged_in IS FALSE
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN", //loggedInStatus REMAINS "NOT_LOGGED_IN" IF logged_in IS FALSE
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  //UPDATES STATE OF loggedInStatus TO "LOGGED_IN" WITH SUCCESSFUL LOGIN

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }
 

  
  //COMPONENTS ARE ROUTED HERE
  //ROUTES FOR HOME & PROFILE HAVE ALL PROPS AVAILABLE TO THEM

  render() {
    return (
      <Router>
        <div className="App">
          {/* <NavBar /> */}
          <Route exact path="/"
            render={props => (
              <Home
                {...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          {/* <Route exact path="/logout"
            render={props => (
              <Logout
                {...props}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          /> */}
          <Route exact path="/profile"
            render={props => (
              <Profile
                {...props}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          <Route exact path="/manager"
            render={props => (
              <Manager
                {...props}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          <Route exact path="/admin"
            render={props => (
              <Admin
                {...props}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          <Route exact path="/reset"
            render={props => (
              <ResetPassword
                {...props}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          <Route exact path="/schedule"
            render={props => (
              <Schedule
                {...props}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;