<script setup lang="ts">
import { computed, ref } from 'vue'
import { vh, vmin, vw } from '../lib/helper/viewport'
import useTodoStore, { createNewTodo } from '../store/todo'
import { breakpointsTailwind, useBreakpoints, usePreferredDark } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

// Image
const imageHeight = computed<number>(() => {
  return breakpoints.smaller('lg') ? Math.floor(vh(33)) : Math.floor(vmin(33))
})
const imageWidth = ref<number>(Math.floor(vw(100)))
const imageURL = ref<string>(`https://picsum.photos/${imageWidth.value}/${imageHeight.value}.webp`)

// Text
const todoInput = ref<string>('')
const clearInput = () => {
  todoInput.value = ''
}

// Store
const todoStore = useTodoStore()

// handle Submit
const handleSubmit = () => {
  if (!todoInput.value.length) return

  const todo = createNewTodo(todoInput.value)
  todoStore.createNewTodo(todo)
  clearInput()
}

// Theme
const isDark = usePreferredDark()

const currentTheme = computed<string>(() => {
  return isDark.value ? 'dark' : 'light'
})

const theme = ref<string>(document.querySelector<HTMLHtmlElement>('html')!.dataset.theme as string)

const handleChangeTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.querySelector<HTMLHtmlElement>('html')!.dataset.theme = theme.value
}
</script>

<template>
  <header class="min-h-[33vh] lg:min-h-[33vmin] relative w-full flex items-center justify-center bg-neutral/[.6]">
    <img
      :src="imageURL"
      loading="lazy"
      alt=""
      class="absolute w-full object-cover max-h-[33vh] lg:max-h-[33vmin] -z-10 top-0 left-0 bottom-0 right-0 h-full"
    />
    <div class="prose mx-auto px-6 basis-full">
      <form @submit.prevent="handleSubmit" class="flex">
        <div class="relative basis-full">
          <input
            type="text"
            placeholder="Enter Todo"
            class="input basis-full w-full"
            v-model="todoInput"
          />
          <transition>
            <button
              @click="clearInput"
              type="button"
              v-show="todoInput.length"
              class="btn btn-square absolute right-0 bg-transparent border-0 hover:bg-transparent"
              :class="[theme === 'dark' ?'fill-current' : 'fill-neutral']"
            >
              <svg viewBox="0 0 24 24" class="w-1/2 h-1/2">
                <path
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </transition>
        </div>
        <label class="swap swap-rotate text-white ml-4">
          <input type="checkbox" @change="handleChangeTheme"/>

          <svg
            class="fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            :class="[currentTheme === 'dark' ? 'swap-off' : 'swap-on']"
          >
            >
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
          </svg>

          <svg
            class=" fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            :class="[currentTheme !== 'dark' ? 'swap-off' : 'swap-on']"
          >
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
          </svg>

        </label>
      </form>
    </div>
  </header>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>