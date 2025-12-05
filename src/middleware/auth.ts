import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(400).json({ message: "Token required!" });
      }
      const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(400).json({message: "Unauthorized. Cannot access!"})
      }
      next();
    } catch (error: any) {
      console.log(error?.message);
      return res.status(500).json({ message: error?.message });
    }
  };
};

export default auth;
