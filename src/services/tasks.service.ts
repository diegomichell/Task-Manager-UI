import {BASE_URL} from "./index";
import {Task} from "../types";

export default {
  getTasks: async (token: string, completed = false) => {
    const r = await fetch(`${BASE_URL}/tasks${completed ? '?completed=true' : ''}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return await r.json();
  },
  removeTask: async (token: string, _id: string) => {
    const r = await fetch(`${BASE_URL}/tasks/${_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return await r.json();
  },
  updateTask: async (token: string, task: Task) => {
    const {description, completed} = task;
    const r = await fetch(`${BASE_URL}/tasks/${task._id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({description, completed})
    });

    return await r.json();
  },
  createTask: async (token: string, task: Task) => {
    const r = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    return await r.json();
  }
}