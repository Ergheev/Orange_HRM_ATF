export interface User {
    username: string;
    password: string;
    role: string
    status: string;
}

export interface UserUpdate{
    username?: string;
    password?: string;
    role?: string;
    status?: string;
}