import { Todo } from '~/todos/todo.api';

const app: Todo[] = [
  {
    id: 1,
    label: 'TODO 1',
    content: 'TODO 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isComplete: false,
  },
  {
    id: 2,
    label: 'TODO 2',
    content: 'TODO 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isComplete: true,
  },
  {
    id: 3,
    label: 'TODO 3',
    content: 'TODO 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isComplete: false,
  },
  {
    id: 4,
    label: 'TODO 4',
    content: 'TODO 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isComplete: false,
  },
];

const getTodos = () => todos;

const getTodo = (id: number) => todos.find(todo => todo.id === id);

const createTodo = (todo: Todo) => {
  const existingTodo = todos.find(existingTodo => existingTodo.id === todo.id);

  if (existingTodo) {
    throw new Error('Todo already exists');
  }

  todos.push(todo);

  return todo;
};

const updateTodo = (todo: Todo) => {
  const existingTodo = todos.find(existingTodo => existingTodo.id === todo.id);

  if (!existingTodo) {
    throw new Error(`No Todo called ${todo.label} exists`);
  }

  todos = todos.map(existingTodo =>
    existingTodo.id === todo.id ? todo : existingTodo,
  );

  return todo;
};

const deleteTodo = (id: number) => {
  const existingTodo = todos.find(todo => todo.id === id);

  if (!existingTodo) {
    throw new Error(`No Todo with id ${id} exists`);
  }

  todos = todos.filter(todo => todo.id !== id);
};

export { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
