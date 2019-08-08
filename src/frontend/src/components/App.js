import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Employee from "./layout/Employee";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRouter from "./common/PrivateRouter";
import { loadUser } from "../actions/auth";
import { Stroka_symbolov } from "../stroka_symbolov/Stroka_symbolov";

import { Provider } from "react-redux";
import store from "../store";

// alert options
const alertOptions = {
  timeout: 3000,
  positioon: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <Switch>
                <PrivateRouter exact path="/" component={Employee} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/game" component={Stroka_symbolov} />
              </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
