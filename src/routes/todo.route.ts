import express, { Router } from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller";

const router: Router = express.Router();

router.post("/add-todo",addTodo);
router.get("/get-todos",getTodos);
router.delete("/delete-todo/:_id",deleteTodo);
router.put("/update-todo/:_id",updateTodo);

export default router;
