import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const getUsers = async () => {
    const result = await pool.query(`
      SELECT * FROM users
    `);
    return result;
}

const getUser = async (id: string | undefined) => {
  const result = await pool.query(
      `
      SELECT * FROM users WHERE id = $1
    `,
      [id]
    );
    return result;
}

const createUser = async (user: Record<string, unknown>) => {
  const {name, email, password, role, age, phone, address} = user;

  const hashed = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
      `
         INSERT INTO users(name, email, password, role, age, phone, address) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, email, hashed, role, age, phone, address]
    );
    return result;
}

const updateUser = async (id: string | undefined, user: any) => {
  const {name, email, age, phone, address} = user;
  const result = await pool.query(
      `
      UPDATE users SET name=$1, email=$2, age=$3, phone=$4, address=$5 WHERE id=$6 RETURNING *
    `,
      [name, email, age, phone, address, id]
    );
    return result;
}

const deleteUser = async (id: string | undefined) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
  return result;
} 

export const userServices = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}