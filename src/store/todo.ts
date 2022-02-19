import { defineStore } from 'pinia'
import { Todo } from '../types/todo'
import { v4 as uuid } from 'uuid'
import axios from 'redaxios'

export type RootState = {
  todos: Todo[];
};

const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  } as RootState),
  actions: {
    async fetchTodos () {
      const { data: todos } = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      this.todos = todos.splice(0, 10);
    },
    createNewTodo (todo: Todo) {
      if (!todo) return

      this.todos = [todo, ...this.todos]
    },

    updateTodo (id: string, payload: Todo) {
      if (!id || !payload) return

      const index = this.findIndexById(id)

      if (index !== -1) {
        this.todos[index] = payload
      }
    },

    deleteTodo (id: string) {
      const index = this.findIndexById(id)

      if (index === -1) return

      this.todos.splice(index, 1)
    },

    findIndexById (id: string) {
      return this.todos.findIndex((todo) => todo.id === id)
    },
  },
})
const createNewTodo = (todo: string): Todo => ({
  userID: uuid(),
  id: uuid(),
  title: todo,
  completed: false,
})
export default useTodoStore

export { createNewTodo }