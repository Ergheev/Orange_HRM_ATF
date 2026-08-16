import * as dotenv from "dotenv";

dotenv.config();

export const credentials = {
    username: process.env.ADMIN_USERNAME ?? "Admin",
    password: process.env.ADMIN_PASSWORD ?? "admin123",
};