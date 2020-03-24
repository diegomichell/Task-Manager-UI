import {call, put, select, takeEvery} from 'redux-saga/effects'
import ActionTypes from '../actions/action-types';
import TaskActions from "../actions/TaskActions";
import TasksService from '../services/tasks.service';

export function* serviceFetchTasks(action: any) {
  try {
    const token = yield select(state => state.users.token);
    const tasks = yield call(TasksService.getTasks, token);
    const completedTasks = yield call(TasksService.getTasks, token, true);

    yield put(TaskActions.setTasks(tasks));
    yield put(TaskActions.setTasks(completedTasks, true));
  } catch (error) {
    yield put(TaskActions.serviceFetchTasksFailed(error))
  }
}

export function* service_fetch_tasks() {
  yield takeEvery(ActionTypes.SERVICE_FETCH_TASKS, serviceFetchTasks)
}