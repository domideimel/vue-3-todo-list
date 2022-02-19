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
</script>

<template>
  <li>
    <div class="form-control">
      <label class="cursor-pointer label w-full">
        <span class="label-text">{{ props.todo.title }}</span>
        <input
          type="checkbox"
          :checked="props.todo.completed"
          class="checkbox checkbox-secondary"
          @change="handleCheckedChange"
        >
      </label>
    </div>
  </li>
</template>