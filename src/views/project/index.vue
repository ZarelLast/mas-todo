<template>
  <Modal :title="modalValue.title" :label="modalValue.label" :placeholder="modalValue.placeholder"
    :status.sync="showModal" :target="modalValue.target" />
  <div class="flex-1 flex flex-col gap-2 px-4">
    <div class="shrink-0 flex flex-row justify-between">
      <div class="flex flex-col">
        <div class="text-sm" @click="backHome">
          <i class="ri-arrow-left-s-line" />
          <span>kembali</span>
        </div>
        <h1 class="font-extrabold text-xl">{{ projectStore.project.name }}</h1>
      </div>
      <div class="flex gap-3">
        <ButtonPrimary @click="addTodo">+ Tambah to-do</ButtonPrimary>
        <ButtonPrimary @click="addPersonil">+ Undang personil</ButtonPrimary>
        <ButtonDanger>Keluar project</ButtonDanger>
      </div>
    </div>
    <div>
      <button>1</button>
      <button>2</button>
    </div>
    <div class="border">
      <ul class="flex flex-col border-[#F9FBFE] divide-y-2">
        <li v-for="(todo, index) in todoStore.todos" class="py-1.5 shrink-0 flex flex-row items-center">
          <div class="py-4 px-5">
            <input type="checkbox" @click="checkboxUpdate(projectStore.project.id, todo.id)"
              :checked="todo.is_complete">
          </div>
          <div class="py-4 px-5 flex-1 font-bold" :class="{ 'line-through': todo.is_complete }">{{ todo.description }}
          </div>
          <div class="py-4 px-5 flex-1">Created by {{ todo.created_by }}</div>
          <div class="py-4 px-5 flex-1">Created at {{ formatDate(todo.created_at) }}</div>
          <div class="py-4 px-5 flex-1">Updated at {{ formatDate(todo.updated_at) }}</div>
          <div class="py-4 px-5">
            <div class="flex flex-row gap-1">
              <button class="bg-blue-200 text-blue-500 py-2 px-2.5 rounded-md" @click="console.log('edit', todo.id)">
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
  </div>

</template>

<script>
import { useProjectStore } from '../../stores/project.store';
import { useTodoStore } from '../../stores/todo.store';
import router from '@/router/index.js'

export default {
  data() {
    return {
      projectStore: useProjectStore(),
      todoStore: useTodoStore(),
      showModal: false,
      modal: {
        title: '',
        label: '',
        placeholder: '',
        status: false,
        method: null
      }
    }
  },
  beforeMount() {
    // 
  },
  methods: {
    backHome() {
      router.push('/')
    },
    // getTodos(){

    // }
    setModal(title, label, placeholder, method) {
      this.modal.title = title
      this.modal.label = label
      this.modal.placeholder = placeholder
      this.modal.status = !this.modal.status
      this.modal.method = method
    },
    openModalForTeam() {
      this.setModal("Undang personil baru", "Email", "Masukkan email", this.handleTeamSubmission);
    },
    handleTeamSubmission(email, setError) {
      // API call simulation
      const validEmails = ["example@example.com"]; // Example list
      if (!validEmails.includes(email)) {
        setError("Personil yang anda input tidak terdaftar!");
      } else {
        // Add email to the API
        console.log("Email valid, adding to team...");
      }
    },
    delTodo(id){
      this.todoStore.delete(id)
    },
    addTodo() {
      this.modal.title = 'Tambah to-do baru'
      this.modal.label = 'Nama list'
      this.modal.placeholder = 'Masukan nama'
      this.modal.target = 'todo'
      this.setModal()
    },
    addPersonil() {
      this.modal.title = 'Undang personil baru'
      this.modal.label = 'Email'
      this.modal.placeholder = 'Masukan email'
      this.modal.target = 'personil'
      this.setModal()
    },
    checkboxUpdate(projectId, todoId) {
      this.projectStore.updateCheckbox(projectId, todoId)
      const formData = this.projectStore.getTodo(projectId, todoId)
      this.todoStore.update(todoId, formData)
    },
    formatDate(dateString) {
      const date = new Date(dateString);

      // Use toLocaleString with custom options
      const formattedDate = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // 24-hour format
      });
      return formattedDate.replace(',', '').replace(':', '.');

    }
  }
}
</script>