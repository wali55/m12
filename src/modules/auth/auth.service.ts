import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const login = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if (result.rows.length === 0) {
        throw new Error("Could not find the user!");
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error("Authentication failed!");
    }

    const token = jwt.sign({name: user.name, email: user.email, role: user.role}, config.jwtSecret as string, {expiresIn: "3d"});
    return {token, user};
}

export const authService = {
    login
}