import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";


const router = express.Router();

router.get("/", auth("admin"), userControllers.getUsers);
router.post("/", userControllers.createUser);
router.get("/:id", userControllers.getUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

export default router;