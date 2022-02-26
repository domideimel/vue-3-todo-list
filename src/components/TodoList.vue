<script setup lang="ts">
import TodoListItem from './TodoListItem.vue'
import draggableComponent from 'vuedraggable'
import useTodoStore, { todoState } from '../store/todo'
import { computed } from 'vue'
import { Todo } from '../types/todo'

const todoStore = useTodoStore()
const todos = computed<Todo[]>({
  get: () => todoStore.todos,
  set: (todos: Todo[]) => {
    todoStore.todos = todos
    todoState.value = todoStore.todos
  }
})

</script>

<template>
  <transition>
    <draggableComponent
      v-model="todos"
      item-key="id"
      tag="ul"
      v-if="todos.length"
      class="menu bg-base-100 menu-compact lg:menu-normal w-full p-2 rounded-box -mt-[25vmin] sm:-mt-[5min] md:-mt-[12vh] lg:-mt-[12vmin] shadow"
    >
      <template #item="{element}">
        <todo-list-item :key="element.id" :todo="element"/>
      </template>
    </draggableComponent>
  </transition>
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