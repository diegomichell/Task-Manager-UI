import {call, put, select, takeEvery} from 'redux-saga/effects'
import ActionTypes from '../actions/action-types';
import TaskActions from "../actions/TaskActions";
import TasksService from '../services/tasks.service';

export function* serviceUpdateTask(action: any) {
  try {
    const {completed, task} = action.payload;
    const token = yield select(state => state.users.token);
    yield call(TasksService.updateTask, token, task);
    yield put(TaskActions.updateTask(task, completed));
  } catch (error) {
    console.error(error);
  }
}

export function* service_update_task() {
  yield takeEvery(ActionTypes.SERVICE_UPDATE_TASK, serviceUpdateTask)
}