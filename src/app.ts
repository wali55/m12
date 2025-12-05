import express, { Request, Response } from "express";
import initDB from "./config/db";
import userRouter from "./modules/user/user.routes";
import todoRouter from "./modules/todo/todo.route";
import authRouter from "./modules/auth/auth.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

initDB();

app.use("/users", userRouter);
app.use("/todos", todoRouter);
app.use("/auth", authRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({message: "Route not found!"});
})

export default app;