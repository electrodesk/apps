import { TodoReadDTO } from "../entity/Todo";

export const TODOS: TodoReadDTO[] = [
  {
    completed: false,
    task: 'Unit testing electron',
    uid: 1
  },
  {
    completed: false,
    task: 'add todo app',
    uid: 2
  },
  {
    completed: true,
    task: 'add todo widget for desktop',
    uid: 3
  }
];
