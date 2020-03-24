import {call, put, select, takeEvery} from 'redux-saga/effects'
import ActionTypes from '../actions/action-types';
import TaskActions from "../actions/TaskActions";
import TasksService from '../services/tasks.service';

export function* serviceRemoveTask(action: any) {
  try {
    const token = yield select(state => state.users.token);
    yield call(TasksService.removeTask, token, action.payload._id);
    yield put(TaskActions.removeTask(action.payload._id, action.payload.completed));
  } catch (error) {
    console.error(error);
  }
}

export function* service_remove_task() {
  yield takeEvery(ActionTypes.SERVICE_REMOVE_TASK, serviceRemoveTask)
}