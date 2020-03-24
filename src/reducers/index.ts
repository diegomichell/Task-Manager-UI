import {combineReducers} from "redux";
import tasks from './tasks.reducer';
import users from "./users.reducer";

export default combineReducers({
    tasks,
    users
})