import { Request, Response } from "express";
import { todoService } from "./todo.service";

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoService.getTodos();
    res
      .status(200)
      .json({ message: "Todos fetched successfully", data: result.rows });
  } catch (error: any) {
    console.log(error?.message);
    res.status(500).json({ message: error?.message });
  }
}

const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await todoService.getTodo(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res
        .status(200)
        .json({ message: "Todo fetched successfully", data: result.rows[0] });
    }
  } catch (error: any) {
    console.log(error?.message);
  }
}

const createTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoService.createTodo(req.body);
    res
      .status(201)
      .json({ message: "Todo created successfully", data: result.rows[0] });
  } catch (error: any) {
    console.log(error?.message);
    res.status(500).json({ message: error?.message });
  }
}

const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await todoService.updateTodo(id as string, req.body);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Could not find the todo" });
    } else {
      res
        .status(200)
        .json({ message: "Todo updated successfully", data: result.rows[0] });
    }
  } catch (error: any) {
    console.log(error?.message);
    res.status(500).json({ message: error?.message });
  }
}

const deleteTodo = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const result = await todoService.deleteTodo(id as string);
    
    if (result.rowCount === 0) {
      res.status(404).json({message: "Cannot find todos"});
    } else {
      res.status(200).json({message: "Todo deleted successfully"});
    }
  } catch (error: any) {
    console.log(error?.message);
    res.status(500).json({message: error?.message});
  }
}

export const todoController = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}