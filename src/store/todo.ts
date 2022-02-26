import { defineStore } from 'pinia'
import { Todo } from '../types/todo'
import { v4 as uuid } from 'uuid'
import { useStorage } from '@vueuse/core'

export type RootState = {
  todos: Todo[];
};

const todoState = useStorage('todos', [] as Todo[])

const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: todoState.value
  } as RootState),
  actions: {
    createNewTodo (todo: Todo) {
      if (!todo) return

      this.todos = [todo, ...this.todos]
      todoState.value = this.todos
    },

    updateTodo (id: string, payload: Todo) {
      if (!id || !payload) return

      const index = this.findIndexById(id)

      if (index !== -1) {
        this.todos[index] = payload
      }

      todoState.value = this.todos
    },

    deleteTodo (id: string) {
      const index = this.findIndexById(id)

      if (index === -1) return

      this.todos.splice(index, 1)
      todoState.value = this.todos
    },

    findIndexById (id: string) {
      return this.todos.findIndex((todo) => todo.id === id)
    },
  },
})

export const createNewTodo = (todo: string): Todo => ({
  id: uuid(),
  title: todo,
  completed: false,
})

export default useTodoStore
