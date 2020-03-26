import {all} from 'redux-saga/effects'
import {service_fetch_tasks} from "./service_fetch_tasks";
import {service_remove_task} from "./service_remove_tasks";
import {service_login} from "./service_login";
import {service_logout} from "./service_logout";
import {service_update_task} from "./service_update_tasks";
import {service_create_task} from "./service_create_tasks";
import {service_create_user} from "./service_create_account";

export default function* rootSaga() {
  yield all([
    service_fetch_tasks(),
    service_remove_task(),
    service_login(),
    service_logout(),
    service_update_task(),
    service_create_task(),
    service_create_user()
  ])
}