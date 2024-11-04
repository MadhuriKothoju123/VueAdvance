// src/tests/api.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTodo, createTodo, updateTodo, deleteTodo, Todo } from '../api';

beforeEach(() => {
  vi.resetAllMocks();
});

describe('API requests', () => {
  it('should fetch a todo item', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 1, title: 'Test Todo', completed: false }),
      })
    ) as vi.Mock;

    const todo = await getTodo();
    expect(todo).toEqual({ id: 1, title: 'Test Todo', completed: false });
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1');
  });

  it('should create a new todo', async () => {
    const newTodo: Todo = { title: 'New Todo', completed: false };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ...newTodo, id: 2 }),
      })
    ) as vi.Mock;

    const todo = await createTodo(newTodo);
    expect(todo).toEqual({ id: 2, title: 'New Todo', completed: false });
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
  });

  it('should update an existing todo', async () => {
    const updatedTodo: Todo = { title: 'Updated Todo', completed: true };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ...updatedTodo, id: 1 }),
      })
    ) as vi.Mock;

    const todo = await updateTodo(1, updatedTodo);
    expect(todo).toEqual({ id: 1, title: 'Updated Todo', completed: true });
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
  });

  it('should delete a todo item', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
      })
    ) as vi.Mock;

    const result = await deleteTodo(1);
    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'DELETE',
    });
  });
});
