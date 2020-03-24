import React, {useState} from 'react';
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import UserActions from "../../actions/UserActions";
import {Button, Col, Form} from "react-bootstrap";
import {Redirect} from "react-router";

const Login = (props: any) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form: any = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      const email = form.elements['email'].value;
      const password = form.elements['password'].value;
      props.login(email, password);
    }

    setValidated(true);
  };

  if(props.isAuthenticated) {
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
      <h3>Log in</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email"/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password"/>
          {props.error && (
            <Form.Text className="text-danger">
              {props.error}
            </Form.Text>
          )}
        </Form.Group>

        <Button block variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Col>
  );
};

const mapStateToProps = ({users}: any) => {
  return {
    error: users.auth_error,
    isAuthenticated: users.token !== null
  }
};

const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    login: (email: string, password: string) => {
      dispatch(UserActions.serviceLogin(email, password));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProp)(Login);