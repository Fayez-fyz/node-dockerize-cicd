import { Request, Response } from "express";
import { Todo } from "../models/todo.model";

type TodoType = {
  todo: string;
  isCompleted: boolean;
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  const { todo } = req.body as TodoType;

  if (!todo) {
    res.status(400).json({ message: "Todo text is required" });
    return;
  }

  try {
    const newTodo = await Todo.create({ todo });
    res.status(201).json({ message: "Todo added successfully", data: newTodo });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ message: "Failed to add todo" });
  }
};

export const getTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ message: "Success", data: todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { _id } = req.params;

  if (!_id) {
    res.status(400).json({ message: "Todo ID is required" });
    return;
  }

  try {
    const deletedTodo = await Todo.findByIdAndDelete(_id);

    if (!deletedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Todo deleted successfully", data: deletedTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { _id } = req.params;
  const { isCompleted } = req.body as Partial<TodoType>;

  if (!_id || isCompleted === undefined) {
    res.status(400).json({ message: "Todo ID and status are required" });
    return;
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      _id,
      { isCompleted },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Todo updated successfully", data: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Failed to update todo" });
  }
};
