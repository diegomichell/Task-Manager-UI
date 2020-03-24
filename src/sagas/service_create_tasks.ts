import {call, put, select, takeEvery} from 'redux-saga/effects'
import ActionTypes from '../actions/action-types';
import TaskActions from "../actions/TaskActions";
import TasksService from '../services/tasks.service';

export function* serviceCreateTask(action: any) {
  try {
    const {task} = action.payload;
    const token = yield select(state => state.users.token);
    const createdTask = yield call(TasksService.createTask, token, task);

    if(createdTask.error) {
      yield put(TaskActions.createTaskFailed(createdTask.error));
      return;
    }

    yield put(TaskActions.addTask(createdTask));
  } catch (error) {
    console.error(error);
    yield put(TaskActions.createTaskFailed(error.message))
  }
}

export function* service_create_task() {
  yield takeEvery(ActionTypes.SERVICE_CREATE_TASK, serviceCreateTask)
}