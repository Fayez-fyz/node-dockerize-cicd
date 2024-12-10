import '../tests/setup';
import request from 'supertest';
import express from 'express';
import { Todo } from '../models/todo.model';
import todoRoutes from "../routes/todo.route";

const app = express();
app.use(express.json());
app.use('/api', todoRoutes);


describe('Todo API Integration Tests', () => {
  it('should add a new todo', async () => {
    const response = await request(app)
      .post('/api/add-todo')
      .send({ todo: 'Test Todo' });
    expect(response.statusCode).toBe(201);
    expect(response.body.data).toHaveProperty('todo', 'Test Todo');
  });

  it('should fetch all todos', async () => {
    // First create a todo
    await Todo.create({ todo: 'Fetch Test Todo' });

    const response = await request(app).get('/api/get-todos');

    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should update a todo', async () => {
    const todo = await Todo.create({ todo: 'Update Test' });

    const response = await request(app)
      .put(`/api/update-todo/${todo._id}`)
      .send({ isCompleted: true });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.isCompleted).toBe(true);
  });

  it('should delete a todo', async () => {
    const todo = await Todo.create({ todo: 'Delete Test' });

    const response = await request(app)
      .delete(`/api/delete-todo/${todo._id}`);

    expect(response.statusCode).toBe(200);
    const deletedTodo = await Todo.findById(todo._id);
    expect(deletedTodo).toBeNull();
  });

  it('should return 400 for invalid todo creation', async () => {
    const response = await request(app)
      .post('/api/add-todo')
      .send({});

    expect(response.statusCode).toBe(400);
  });
});