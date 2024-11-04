// src/api.ts
export interface Todo {
    id?: number;
    title: string;
    completed: boolean;
  }
  
  export async function getTodo(): Promise<Todo> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    return response.json();
  }
  
  export async function createTodo(todo: Todo): Promise<Todo> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    return response.json();
  }
  
  export async function updateTodo(id: number, todo: Todo): Promise<Todo> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    return response.json();
  }
  
  export async function deleteTodo(id: number): Promise<boolean> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  }
  