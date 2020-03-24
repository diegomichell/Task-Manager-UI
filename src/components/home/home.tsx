import React, {Component} from "react";
import './home.scss';
import {connect} from "react-redux";
import TaskActions from "../../actions/TaskActions";
import {Dispatch} from "redux";
import TasksList from "../tasks-list/tasks-list";
import {Button, Col, Row} from "react-bootstrap";
import {IoIosAddCircleOutline} from 'react-icons/io';
import CreateTask from "../create-task/create-task";

class Home extends Component<any> {
  state = {
    showCreateTask: false
  };

  componentDidMount() {
    this.props.serviceFetchTasks();
  }

  render() {
    return (
      <div className="home">
        <Row className="mb-5">
          <Col md={{span: 4, offset: 4}}>
            <Button onClick={() => this.openCreateTask()}>New Task <IoIosAddCircleOutline/></Button>
            <CreateTask handleClose={() => this.closeCreateTask()} show={this.state.showCreateTask} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TasksList title="Pending Tasks" tasks={this.props.pendingTasks}/>
          </Col>
          <Col md={6}>
            <TasksList title="Completed Tasks" tasks={this.props.completedTasks}/>
          </Col>
        </Row>
      </div>
    );
  }

  openCreateTask() {
    this.setState({
      showCreateTask: true
    });
  }

  closeCreateTask() {
    this.setState({
      showCreateTask: false
    });
  }

}

const mapStateToProps = ({tasks}: any) => {
  return {
    pendingTasks: Object.values(tasks.tasks),
    completedTasks: Object.values(tasks.completedTasks)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  serviceFetchTasks: () => dispatch(TaskActions.serviceFetchTasks())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
