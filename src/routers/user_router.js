import express from "express";
import userController from "../controllers/user_controller.js";

const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);

userRouter.post("/", userController.createUser);

userRouter.put("/:id", userController.updateUserById);

userRouter.delete("/:id", userController.deleteUserById);

export default userRouter;
