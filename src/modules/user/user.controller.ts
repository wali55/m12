import { Request, Response } from "express";
import { userServices } from "./user.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: result.rows });
  } catch (error: any) {
    console.log(error?.message);
    res.status(500).json({ message: error?.message });
  }
}

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userServices.getUser(id);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res
        .status(200)
        .json({ message: "User fetched successfully", data: result.rows[0] });
    }
  } catch (error: any) {
    console.log(error?.message);
    res.status(500).json({ message: error?.message });
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);
    res.status(201).json({ message: "User created", data: result.rows[0] });
  } catch (error: any) {
    console.log(error?.message);
    res.status(500).json({ message: error?.message });
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userServices.updateUser(id, req.body);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res
        .status(200)
        .json({ message: "User updated successfully", data: result.rows[0] });
    }
  } catch (error: any) {
    console.log(error?.message);
    res.status(500).json({ message: error?.message, error: error });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userServices.deleteUser(id);

    if (result.rowCount === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error: any) {
    console.log(error?.message);
    res.status(500).json({ message: error?.message });
  }
}

export const userControllers = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}