import { pool } from "../../config/db";

const getTodos = async () => {
    const result = await pool.query(`SELECT * FROM todos`);
    return result;
}

const getTodo = async (id: string) => {
    const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [id]);
    return result;
}

const createTodo = async (todo: any) => {
    const {user_id, title, description, due_date} = todo;
    const result = await pool.query(
      `
      INSERT INTO todos(user_id, title, description, due_date) VALUES($1, $2, $3, $4) RETURNING *
    `,
      [user_id, title, description, due_date]
    );
    return result;
}

const updateTodo = async (id: string, todo: any) => {
    const {user_id, title, description, due_date} = todo;
    const result = await pool.query(
      `UPDATE todos SET user_id=$1, title=$2, description=$3, due_date=$4 WHERE id=$5 RETURNING *`,
      [user_id, title, description, due_date, id]
    );
    return result;
}

const deleteTodo = async (id: string) => {
    const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
    return result;
}

export const todoService = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}