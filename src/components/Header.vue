<script setup lang="ts">
import { ref } from 'vue'
import { vmin, vw } from '../lib/helper/viewport'
import useTodoStore, { createNewTodo } from '../store/todo'

// Image
const imageHeight = ref<number>(Math.floor(vmin(33)))
const imageWidth = ref<number>(Math.floor(vw(100)))
const imageURL = ref<string>(`https://picsum.photos/${imageWidth.value}/${imageHeight.value}.webp`)

// Text
const todoInput = ref<string>('')

// Store
const todoStore = useTodoStore()

// handle Submit
const handleSubmit = () => {
  if (todoInput.value !== '') {
    const todo = createNewTodo(todoInput.value)
    todoStore.createNewTodo(todo)
  }
  todoInput.value = ''
}
</script>

<template>
  <header class="min-h-[33vmin] relative w-full flex items-center justify-center bg-neutral/[.6]">
    <img
      :src="imageURL"
      loading="lazy"
      alt=""
      class="absolute w-full object-cover max-h-[33vmin] -z-10 top-0 left-0 bottom-0 right-0"
    />
    <div class="prose mx-auto px-6 basis-full">
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          placeholder="Enter Todo"
          class="input basis-full w-full"
          v-model.trim="todoInput"
        />
      </form>
    </div>
  </header>
</template>