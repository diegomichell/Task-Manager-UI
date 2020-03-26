import React, {useState} from 'react';
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import UserActions from "../../actions/UserActions";
import {Button, Col, Form} from "react-bootstrap";
import {Redirect} from "react-router";
import {User} from "../../types";

import './register.scss';

const Register = (props: any) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form: any = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      console.log("Hola");
      const name = form.elements['name'].value;
      const email = form.elements['email'].value;
      const password = form.elements['password'].value;
      const user: any = {
        name,
        email,
        password
      };

      props.createAccount(user);
    }

    setValidated(true);
  };

  if (props.isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/home",
        }}
      />
    );
  }

  return (
    <Col md={{span: 4, offset: 4}}>
      <div className="register">
        <h3>Create Account</h3>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" required placeholder="Enter your name"/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" required placeholder="Enter email"/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" required placeholder="Password"/>
            {props.error && (
              <Form.Text className="text-danger">
                {props.error}
              </Form.Text>
            )}
          </Form.Group>
          <Button block variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    </Col>
  );
};

const mapStateToProps = ({users}: any) => {
  return {
    error: users.create_user_error,
    isAuthenticated: users.token !== null
  }
};

const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    createAccount: (user: User) => {
      dispatch(UserActions.serviceCreateUser(user));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProp)(Register);