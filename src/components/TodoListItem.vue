<script setup lang="ts">

import { Todo } from '../types/todo'
import useTodoStore from '../store/todo'
import { ref } from 'vue'

interface Props {
  todo: Todo;
}

const props = defineProps<Props>()
const todoStore = useTodoStore()

const localTodo = ref<Todo>(props.todo)

const handleCheckedChange = (e: Event) => {
  localTodo.value.completed = (e.target as HTMLInputElement).checked
  todoStore.updateTodo(localTodo.value.id.toString(), localTodo.value)
}

const handleDelete = () => {
  todoStore.deleteTodo(localTodo.value.id.toString())
}
</script>

<template>
  <li>
    <div class="indicator w-full bg-black/[.05] hover:bg-black/[0.15]">
      <button
        class="indicator-item badge badge-secondary w-6 h-6 p-1 rounded-full hover:bg-secondary-focus hover:border-secondary-focus"
        @click="handleDelete"
      >
         <svg viewBox="0 0 24 24" class="w-3 h-3 fill-white">
           <path
             d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
           />
         </svg>
      </button>
      <div class="form-control w-full ">
        <label class="cursor-pointer label w-full">
          <span
            class="label-text"
            :class="[props.todo.completed && 'line-through']"
          >{{ props.todo.title }}</span>
          <input
            type="checkbox"
            :checked="props.todo.completed"
            class="checkbox checkbox-secondary"
            @change="handleCheckedChange"
          >
        </label>
      </div>
    </div>
  </li>
</template>