import {Login, User} from "../types";
import {BASE_URL} from "./index";

export default {
    createUser: async (user: User): Promise<User> => {
        const r = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            body: JSON.stringify(user)
        });

        return await r.json();
    },
    login: async (email: string, password: string): Promise<Login> => {
        const r = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        return await r.json();
    },
    logout: async (token: string): Promise<Login> => {
        const r = await fetch(`${BASE_URL}/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return await r.json();
    }
}