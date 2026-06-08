import pool from "../config/db";
import { QueryResult } from "pg";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
}

export const createUserModel = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const result: QueryResult<User> = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};

export const findUserByEmailModel = async (
  email: string
): Promise<User | null> => {
  const result: QueryResult<User> = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0] ?? null;
};