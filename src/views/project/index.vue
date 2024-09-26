<template>
  <Modal />
  <div class="flex-1 flex flex-col gap-2 px-4">
    <!-- secondary -->
    <div class="shrink-0 flex flex-row justify-between">
      <!-- title -->
      <div class="flex flex-col">
        <div class="text-sm" @click="toHome">
          <i class="ri-arrow-left-s-line" />
          <span>kembali</span>
        </div>
        <h1 class="font-extrabold text-xl">{{ projectStore.project.name }}</h1>
      </div>
      <!-- button action -->
      <div class="flex flex-row gap-2">
        <ButtonPrimary @click="modalTodo">+ Tambah to-do</ButtonPrimary>
        <ButtonPrimary @click="modalTeam">+ Undang personil</ButtonPrimary>
        <ButtonDanger @click="leaveProject">Keluar project</ButtonDanger>
      </div>
    </div>

    <div class="flex flex-row gap-3">
      <ButtonMinimal @click="$router.push('/project/todo')" intent="active">
        To-do list
      </ButtonMinimal>
      <ButtonMinimal @click="$router.push('/project/team')" intent="disabled">
        Personil
      </ButtonMinimal>
    </div>

    <div class="border rounded-md">
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
  </div>

</template>

<script>
import { useProjectStore } from '@/stores/project.store';
import { useTodoStore } from '@/stores/todo.store';
import { useTeamStore } from '@/stores/team.store';
import { useModalStore } from '../../stores/modal.store';
import router from '@/router/index.js'

export default {
  data() {
    return {
      projectStore: useProjectStore(),
      todoStore: useTodoStore(),
      teamStore: useTeamStore(),
      modalStore: useModalStore()
    }
  },
  beforeMount() {
    this.teamStore.get(this.projectStore.project.id)
  },
  methods: {
    toHome() {
      router.push('/')
    },
    todoSubmit(val, setError) {
      this.todoStore.add({ project_id: this.projectStore.project.id, description: val })
      setError()
    },
    todoUpdate(val, setError) {
      this.todoStore.update(this.todoStore.todo.id, val)
      setError()
    },
    modalTodo() {
      this.modalStore.setModal('Tambah to-do baru', 'Nama list', 'Masukan nama', this.todoSubmit)
    },
    updateTodo(data, setError) {
      this.todoStore.todo = data
      this.modalStore.setModal('Edit to-do', 'Nama list', 'Masukan nama', this.todoUpdate)
      setError()
    },
    delTodo(id) {
      this.todoStore.delete(id)
    },
    teamSubmit(val, setError) {
      const res = this.teamStore.add({ project_id: this.projectStore.project.id, email: val })

      // minus jika sudah join maka tetep keluar ini
      res.then((response) => {
        let message = ''
        let status = false
        if (response.status == 404) {
          message = "Personil yang anda input tidak terdaftar!"
          status = true
        }
        if (response.status == 400) {
          message = "Personil yang anda input sudah terdaftar!"
          status = true
        }
        setError(message, status);
      })
    },
    modalTeam() {
      this.modalStore.setModal('Undang personil baru', 'Email', 'Masukan email', this.teamSubmit, 'email')
    },
    leaveProject() {
      this.teamStore.deleteAlert(this.projectStore.project.id, this.$swal, this.toHome)
    },
    checkboxUpdate(projectId, todoId) {
      this.projectStore.updateCheckbox(projectId, todoId)
      const formData = this.projectStore.getTodo(projectId, todoId)
      this.todoStore.update(todoId, formData)
    },
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