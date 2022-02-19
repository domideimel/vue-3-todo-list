<script setup lang="ts">
import TodoListItem from './TodoListItem.vue'
import useTodoStore from '../store/todo'
import { computed } from 'vue'
import { Todo } from '../types/todo'

const todoStore = useTodoStore()
const todos = computed<Todo[]>(() => todoStore.todos)

</script>

<template>
  <ul
    v-if="todos.length"
    class="menu bg-base-100 menu-compact lg:menu-normal w-full p-2 rounded-box -mt-[25vmin] sm:-mt-[5min] md:-mt-[12vh] lg:-mt-[12vmin] shadow"
  >
    <todo-list-item v-for="todo in todos" :key="todo.id" :todo="todo"/>
  </ul>
</template>