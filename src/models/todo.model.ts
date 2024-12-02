import mongoose, { Schema } from "mongoose";

export const todoSchema = new Schema(
  {
    todo: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoSchema);
