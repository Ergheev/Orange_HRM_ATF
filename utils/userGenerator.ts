import  {User} from "../types/User";

export function generateUniqueUsername(): string  {
    return `auto_${Math.floor(Date.now() / 1000)}`;
}

export function generateUser(): User {
    return {
        username: generateUniqueUsername(),
        password: "Password123",
        role: "ESS",
        status: "Enabled"
    };
}