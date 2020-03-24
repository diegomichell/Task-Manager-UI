import ACTION_TYPES from '../actions/action-types';
import {Task} from "../types";

const initialState = {
  tasks: {},
  completedTasks: {},
  create_error: null
};

const tasks = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TASKS: {
      const tasks: any = {};
      action.payload.tasks.forEach((t: Task) => {
        tasks[t._id] = t;
      });

      const newState = {...state};
      const {completed} = action.payload;
      newState[`${completed ? 'completedTasks' : 'tasks'}`] = tasks;

      return newState;
    }
    case ACTION_TYPES.ADD_TASK:
      return {...state, tasks: {...state.tasks, [action.payload.task._id]: action.payload.task}};
    case ACTION_TYPES.REMOVE_TASK: {
      const {completed, _id} = action.payload;
      const tasks = {...state[`${completed ? 'completedTasks' : 'tasks'}`]};
      // @ts-ignore
      delete tasks[_id];
      const newState = {...state};
      newState[`${completed ? 'completedTasks' : 'tasks'}`] = tasks;

      return newState;
    }
    case ACTION_TYPES.UPDATE_TASK: {
      const newState = {...state};
      const {task} = action.payload;
      const tasks = {...state[`${task.completed ? 'completedTasks' : 'tasks'}`]};
      tasks[task._id] = task;

      if (task.completed) {
        newState['completedTasks'] = tasks;
        delete newState['tasks'][task._id];
      } else {
        newState['tasks'] = tasks;
        delete newState['completedTasks'][task._id];
      }

      return newState;
    }
    case ACTION_TYPES.CREATE_TASK_FAILED:
      return {...state, create_error: action.payload.error};
    default:
      return state
  }
};

export default tasks;