import ACTION_TYPES from '../actions/action-types';

const initialState = {
  user: null,
  token: null,
  auth_error: null
};

const users = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN: {
      return {
        ...state,
        ...action.payload
      };
    }
    case ACTION_TYPES.LOG_OUT:
      return {...initialState};
    case ACTION_TYPES.LOGIN_FAILED:
      return {
        ...state,
        auth_error: action.payload.error
      };
    default:
      return state
  }
};

export default users;