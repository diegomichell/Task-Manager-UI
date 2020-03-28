import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import Home from "./components/home/home";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import ProtectedRoute from "./components/protected-route/protected-route";
import About from "./components/about/about";
import Login from "./components/login/login";
import Register from "./components/register/register";
import UserActions from "./actions/UserActions";
import {connect} from "react-redux";
import {Dispatch} from "redux";

export function App(props: any) {
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/home">Task Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" role="button" to="/home">Home</Link>
              <Link className="nav-link" role="button" to="/about">About</Link>
            </Nav>
            {props.isAuthenticated && (
              <>
                <a className="nav-link text-dark">
                  {props.user.name}
                </a>
                <a onClick={() => {
                  props.logout();
                }} href="#" className="nav-link text-danger">
                  Logout
                </a>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
        <Container className="mt-5">
          <Row>
            <Col>
              <Switch>
                <Route path="/home">
                  <ProtectedRoute>
                    <Home/>
                  </ProtectedRoute>
                </Route>
                <Route path="/about">
                  <About/>
                </Route>
                <Route path="/login">
                  <Login/>
                </Route>
                <Route path="/register">
                  <Register/>
                </Route>
                <Redirect exact from="/" to="/home"/>
                <Route path='*' exact={true} >
                  <h1>Page Not Found</h1>
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

const mapStateToProps = ({users}: any) => {
  return {
    user: users.user,
    isAuthenticated: users.token !== null
  }
};

const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    logout: () => {
      dispatch(UserActions.serviceLogout())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
