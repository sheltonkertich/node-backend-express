import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "./entities/User.js"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin123",
    database: "postgres",
    //synchronize: true,
    //logging: true,
    entities: [User],
    subscribers: [],
    migrations: ['src/migrations/**/*.{js,ts}'],
    
})