import {Task} from "../types";
import ACTION_TYPES from './action-types';

export default {
    serviceFetchTasks: () => {
        return {
            type: ACTION_TYPES.SERVICE_FETCH_TASKS,
            payload: {}
        }
    },
    serviceFetchTasksFailed: (error: any) => {
        return {
            type: ACTION_TYPES.SERVICE_FETCH_TASKS_FAILED,
            payload: {
                error
            }
        }
    },
    serviceRemoveTask: (_id: string, completed = false) => {
        return {
            type: ACTION_TYPES.SERVICE_REMOVE_TASK,
            payload: {
                _id,
                completed
            }
        }
    },
    serviceUpdateTask: (task: Task, completed = false) => {
        return {
            type: ACTION_TYPES.SERVICE_UPDATE_TASK,
            payload: {
                task,
                completed
            }
        }
    },
    serviceCreateTask: (task: Task) => {
        return {
            type: ACTION_TYPES.SERVICE_CREATE_TASK,
            payload: {
                task
            }
        }
    },
    setTasks: (tasks: Task[], completed = false) => {
        return {
            type: ACTION_TYPES.SET_TASKS,
            payload: {
                tasks,
                completed
            }
        }
    },
    addTask: (task: Task) => {
        return {
            type: ACTION_TYPES.ADD_TASK,
            payload: {
                task
            }
        }
    },
    removeTask: (_id: string, completed = false) => {
        return {
            type: ACTION_TYPES.REMOVE_TASK,
            payload: {
                _id,
                completed
            }
        }
    },
    updateTask: (task: Task, completed = false) => {
        return {
            type: ACTION_TYPES.UPDATE_TASK,
            payload: {
                task,
                completed
            }
        }
    },
    createTaskFailed(error: string) {
        return {
            type: ACTION_TYPES.CREATE_TASK_FAILED,
            payload: {
                error
            }
        };
    }
}