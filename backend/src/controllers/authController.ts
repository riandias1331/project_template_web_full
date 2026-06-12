import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  loginUserService,
  registerUserService
} from "../services/authService";
import { User } from "../models/authModel";

const handleResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data?: T,
  token?: string
): void => {
  res.status(status).json({
    status,
    message,
    data,
    ...(token && { token })
  });
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body as User;

    if (!name || !email || !password) {
      handleResponse(res, 400, "Name, email and password are required");
      return;
    }

    const user = await registerUserService(name, email, password);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    handleResponse(
      res,
      201,
      "User registered successfully",
      { id: user.id, name: user.name, email: user.email },
      token
    );

  } catch (error) {
    handleResponse(res, 400, (error as Error).message);
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      handleResponse(res, 400, "Email and password are required");
      return;
    }

    const user = await loginUserService(email, password);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    handleResponse(
      res,
      200,
      "Login successful",
      { id: user.id, name: user.name, email: user.email },
      token
    );
    console.log('User logged in:', user.email);

  } catch (error) {
    handleResponse(res, 400, (error as Error).message);
  }
};