import {call, put, takeEvery} from 'redux-saga/effects'
import ActionTypes from '../actions/action-types';
import UsersService from '../services/users.service';
import UserActions from "../actions/UserActions";

export function* serviceLogout(action: any) {
  try {
    yield call(UsersService.logout, action.payload.token);

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    yield put(UserActions.logout());

    window.location.replace('/login');
  } catch (error) {
    console.log(error);
  }
}

export function* service_logout() {
  yield takeEvery(ActionTypes.SERVICE_LOGOUT, serviceLogout)
}