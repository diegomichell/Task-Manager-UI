import ACTION_TYPES from './action-types';
import {User} from "../types";

export default {
  serviceLogin: (email: string, password: string) => {
    return {
      type: ACTION_TYPES.SERVICE_LOGIN,
      payload: {
        email,
        password
      }
    }
  },
  login: (user: User, token: string) => {
    return {
      type: ACTION_TYPES.LOGIN,
      payload: {
        user,
        token
      }
    }
  },
  logout: () => {
    return {
      type: ACTION_TYPES.LOG_OUT,
      payload: {}
    }
  },
  loginFailed: (error: string) => {
    return {
      type: ACTION_TYPES.LOGIN_FAILED,
      payload: {
        error
      }
    }
  },
  createUserFailed: (error: string) => {
    return {
      type: ACTION_TYPES.CREATE_USER_FAILED,
      payload: {
        error
      }
    }
  },
  serviceLogout: () => {
    return {
      type: ACTION_TYPES.SERVICE_LOGOUT,
      payload: {}
    }
  },
  serviceCreateUser: (user: User) => {
    return {
      type: ACTION_TYPES.SERVICE_CREATE_USER,
      payload: {
        user
      }
    }
  }
}