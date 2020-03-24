import React, {useState} from 'react';
import {connect} from "react-redux";
import {Dispatch} from 'redux';
import {Button, Form, Modal} from "react-bootstrap";
import {Task} from "../../types";
import TaskActions from "../../actions/TaskActions";
import PropTypes from 'prop-types';

import './create-task.scss';

const CreateTask = ({show, handleClose, create, error}) => {
  const [validated, setValidated] = useState(false);
  let formRef: any = null;

  const handleSubmit = (event?: any) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (formRef.checkValidity()) {
      const description = formRef.elements['description'].value;
      create({description});
      handleClose();
    }

    setValidated(true);
  };

  return (
    <Modal className="create-task" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={(ref: any) => {
          formRef = ref
        }} noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control required name="description" type="text" placeholder="Task description..."/>
            {error && (
              <Form.Text className="text-danger">
                {error}
              </Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {
          handleSubmit();
        }}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = ({tasks}: any) => {
  return {
    error: tasks.create_error,
  }
};

const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    create: (task: Task) => {
      dispatch(TaskActions.serviceCreateTask(task));
    }
  }
};

CreateTask.propType = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProp)(CreateTask);