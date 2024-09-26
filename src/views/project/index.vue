<template>
  <div class="border rounded-md">
    <ul class="flex flex-col border-[#F9FBFE] divide-y-2">
      <li v-for="(todo, index) in fetchTodos" class="py-1.5 shrink-0 flex flex-row items-center">
        <div class="py-4 px-5">
          <input type="checkbox" @click="checkboxUpdate(projectStore.project.id, todo.id)" :checked="todo.is_complete">
        </div>
        <div class="py-4 px-5 flex-1 font-bold" :class="{ 'line-through': todo.is_complete }">{{ todo.description }}
        </div>
        <div class="py-4 px-5 flex-1">Created by {{ todo.created_by }}</div>
        <div class="py-4 px-5 flex-1">Created at {{ formatDate(todo.created_at) }}</div>
        <div class="py-4 px-5 flex-1">Updated at {{ formatDate(todo.updated_at) }}</div>
        <div class="py-4 px-5">
          <div class="flex flex-row gap-1">
            <button class="bg-blue-200 text-blue-500 py-2 px-2.5 rounded-md" @click="updateTodo(todo)">
              <i class="ri-edit-box-line h-3 w-3" />
            </button>
            <button class="bg-red-200 text-red-500 py-2 px-2.5 rounded-md" @click="delTodo(todo.id)">
              <i class="ri-delete-bin-line h-3 w-3" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useProjectStore } from '@/stores/project.store';
import { useTodoStore } from '@/stores/todo.store';

export default {
  data() {
    return {
      projectStore: useProjectStore(),
      todoStore: useTodoStore(),
    }
  },
  computed:{
    fetchTodos(){
      this.projectStore.fetch()
      this.projectStore.setProject(this.projectStore.project.id)
      this.todoStore.todos = this.projectStore.project.todo
      return this.todoStore.todos
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      return formattedDate.replace(',', '').replace(':', '.');
    }
  }
}
</script>