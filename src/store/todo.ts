import { defineStore } from 'pinia'
import { Todo } from '../types/todo'
import { v4 as uuid } from 'uuid'

export type RootState = {
  todos: Todo[];
};

const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  } as RootState),
  actions: {
    createNewTodo (todo: Todo) {
      if (!todo) return

      this.todos.push(todo)
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