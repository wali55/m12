import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoController } from "./todo.controller";

const router = express.Router();

router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.get("/:id", todoController.getTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo)

export default router;