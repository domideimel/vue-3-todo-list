<script setup lang="ts">
import Header from './components/Header.vue'
import TodoList from './components/TodoList.vue'

import useTodoStore from './store/todo'
import { usePreferredDark } from '@vueuse/core'

const isDark = usePreferredDark()
if (isDark) {
  document.querySelector<HTMLHtmlElement>('html')!.dataset.theme = 'dark'
}

const todoStore = useTodoStore()

// Fetch Dummy todos
todoStore.fetchTodos()

</script>

<template>
  <Header/>
  <main class="prose mx-auto px-6 z-10 relative">
    <todo-list />
  </main>
</template>