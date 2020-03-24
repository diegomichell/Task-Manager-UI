import React from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

const ProtectedRoute = (props: any) => {
  if (!props.isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }

  return props.children;
};

const mapStateToProps = ({users}: any) => {
  return {
    isAuthenticated: users.token !== null
  }
};

export default connect(mapStateToProps)(ProtectedRoute);