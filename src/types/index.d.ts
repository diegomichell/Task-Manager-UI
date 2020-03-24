export interface User {
    _id: string,
    name: string,
    password: string,
    age: Number,
    email: string,
    avatar: string
}

export interface Task {
    _id: string,
    description: string,
    completed: boolean,
    owner: string,
    createdAt: string,
    updatedAt: string
}

export interface Login {
    user: User,
    token: string
}

