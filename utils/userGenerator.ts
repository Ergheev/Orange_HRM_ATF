import {User} from "../types/User";

export function generateUniqueUsername(): string {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).slice(2, 10);
    return `auto_${timestamp}_${randomPart}`;
}

export function generateUser(): User {
    return {
        username: generateUniqueUsername(),
        password: "Password123",
        role: "ESS",
        status: "Enabled"
    };
}