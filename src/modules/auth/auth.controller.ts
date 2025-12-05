import { Request, Response } from "express";
import { authService } from "./auth.service";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.login(email, password);
    res.status(200).json({ message: "Login successful!", data: result });
  } catch (error: any) {
    console.log(error?.message);
    res.status(500).json({ message: error?.message });
  }
};

export const authController = {
  login,
};
