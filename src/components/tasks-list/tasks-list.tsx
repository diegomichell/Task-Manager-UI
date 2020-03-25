import React, {useState} from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import PropTypes from 'prop-types';
import {IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline} from "react-icons/io";
import {Button, Col, Dropdown, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Task} from "../../types";
import TaskActions from "../../actions/TaskActions";
import DottedToggle from "../ui-kit/dotted-toggle";
import moment from "moment";

import "./tasks-list.scss";

const TaskItem = ({task, removeTask, markAsComplete, updateTask}) => {
  const [editable, setEditable] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form: any = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      const description = form.elements['description'].value;
      updateTask({...task, description});
      setEditable(false);
    }

    setValidated(true);
  };

  return (
    <ListGroupItem className="task-item" key={task._id}>
      {editable ?
        (
          <div className="editable">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control defaultValue={task.description} required name="description" type="text"
                              placeholder="Task description..."/>
              </Form.Group>
              <Row>
                <Col className="mb-2" md={6}>
                  <Button onClick={() => setEditable(false)} block variant="outline-primary" type="button">
                    Cancel
                  </Button>
                </Col>
                <Col md={6}>
                  <Button block variant="primary" type="submit">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        )
        : (
          <div className="no-editable">
            <span className={`tasks-description ${task.completed ? 'task-completed' : ''}`}>
              {task.description}
            </span>

            <Dropdown drop="right" className="float-right task-menu">
              <Dropdown.Toggle as={DottedToggle} id="dropdown-basic"/>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setEditable(true)}>Modify</Dropdown.Item>
                <Dropdown.Item onClick={() => removeTask(task._id, task.completed)}>Remove</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item disabled>Created at {moment(task.createdAt).format("MMM Do YYYY")}</Dropdown.Item>
                <Dropdown.Item disabled>Updated at {moment(task.updatedAt).format("MMM Do YYYY")}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <div onClick={() => markAsComplete(task, task.completed)}
                 className={`float-left mark-as-complete ${task.completed ? 'task-completed' : ''}`}>
              {task.completed ? <IoIosCheckmarkCircle/> : <IoIosCheckmarkCircleOutline/>}
            </div>
          </div>
        )}
    </ListGroupItem>
  )
};

const TasksList = (props) => {
  const tasks: Task[] = props.tasks;

  return (
    <div className="tasks-list">
      <h3 className="tasks-title">{props.title}</h3>

      <ListGroup>
        {tasks.map((task: Task) =>
          <TaskItem key={task._id} task={task} updateTask={props.updateTask}
                    markAsComplete={props.markAsComplete} removeTask={props.removeTask}/>
        )}
      </ListGroup>
    </div>
  )
};

TasksList.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTask: (_id: string, completed: boolean) => dispatch(TaskActions.serviceRemoveTask(_id, completed)),
  markAsComplete: (task: Task, completed: boolean) => dispatch(TaskActions.serviceUpdateTask({
    ...task,
    completed: !task.completed
  }, completed)),
  updateTask: (task: Task, completed: boolean) => dispatch(TaskActions.serviceUpdateTask(task, completed))
});

export default connect(null, mapDispatchToProps)(TasksList);