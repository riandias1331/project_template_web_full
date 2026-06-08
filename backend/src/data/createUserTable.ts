import pool from "../config/db";

const createUserTable = async (): Promise<void> => {
    const query: string = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );
    `;

    try {
        await pool.query(query);
        console.log("User table created successfully");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating user table:", error.message);
        } else {
            console.error("Unknown error occurred while creating user table");
        }
    }
};

export default createUserTable;