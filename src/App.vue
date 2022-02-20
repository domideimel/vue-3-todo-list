<script setup lang="ts">
import Header from './components/Header.vue'
import TodoList from './components/TodoList.vue'
</script>

<template>
  <Header/>
  <main class="prose mx-auto px-6 z-10 relative">
    <todo-list />
  </main>
</template>