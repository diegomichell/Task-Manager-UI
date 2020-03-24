import {call, put, takeEvery} from 'redux-saga/effects'
import ActionTypes from '../actions/action-types';
import UsersService from '../services/users.service';
import UserActions from "../actions/UserActions";

export function* serviceLogin(action: any) {
  try {
    const {user, token, error} = yield call(UsersService.login, action.payload.email, action.payload.password);

    if(error) {
      yield put(UserActions.loginFailed(error));
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    yield put(UserActions.login(user, token));
  } catch (error) {
    yield put(UserActions.loginFailed(error.message))
  }
}

export function* service_login() {
  yield takeEvery(ActionTypes.SERVICE_LOGIN, serviceLogin)
}