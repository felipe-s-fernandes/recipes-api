import express from "express";
import userRouter from "./routers/user_router.js";
import recipeRouter from "./routers/recipe_router.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/recipes", recipeRouter);

export default router;
