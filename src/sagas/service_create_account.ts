import {call, put, takeEvery} from 'redux-saga/effects'
import ActionTypes from '../actions/action-types';
import UsersService from '../services/users.service';
import UserActions from "../actions/UserActions";

export function* serviceCreateUser(action: any) {
  try {
    const {user, token, error} = yield call(UsersService.createUser, action.payload.user);

    if(error) {
      yield put(UserActions.createUserFailed(error));
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    yield put(UserActions.login(user, token));
  } catch (error) {
    yield put(UserActions.createUserFailed(error.message))
  }
}

export function* service_create_user() {
  yield takeEvery(ActionTypes.SERVICE_CREATE_USER, serviceCreateUser)
}