<template>
  <Modal :title="modal.title" :label="modal.label" :placeholder="modal.placeholder" :onSubmit="modal.method"
  :status.sync="modal.status" :type="modal.type" />
  <div class="flex-1 flex flex-col gap-2 px-4">
    <!-- secondary -->
    <div class="shrink-0 flex flex-row justify-between">
      <!-- title -->
      <div class="flex flex-col">
        <div class="text-sm" @click="backHome">
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

    <div class="flex flex-row gap-2">
      <ButtonMinimal @click="$router.push('/project/todo')" intent="disabled">
        To-do list
      </ButtonMinimal>
      <ButtonMinimal @click="$router.push('/project/team')" intent="active">
        Personil
      </ButtonMinimal>
    </div>

    <div class="border rounded-md">
      <ul class="flex flex-col border-[#F9FBFE] divide-y-2">
        <li class="py-1.5 shrink-0 flex flex-row items-center font-bold bg-base-section rounded-t-md">
          <div class="py-4 px-5">
            #
          </div>
          <div class="py-4 px-5 flex-1">
            Nama Personil
          </div>
          <div class="py-4 px-5 flex-1">
            Email
          </div>
          <div class="py-4 px-5 flex-1">
            No Telepon
          </div>
        </li>
        <li v-for="(user, index) in teamStore.teams" class="py-1.5 shrink-0 flex flex-row items-center">
          <div class="py-4 px-5">
            {{ index + 1 }}
          </div>
          <div class="py-4 px-5 flex-1 font-bold">
            {{ user.name }}
          </div>
          <div class="py-4 px-5 flex-1">
            {{ user.email }}
          </div>
          <div class="py-4 px-5 flex-1">
            {{ user.phone_number }}
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
import router from '@/router/index.js'

export default {
  data() {
    return {
      projectStore: useProjectStore(),
      todoStore: useTodoStore(),
      teamStore: useTeamStore(),
      modal: {
        title: '',
        label: '',
        placeholder: '',
        status: false,
        method: null,
        defaultInput: ''
      }
    }
  },
  beforeMount() {
    this.teamStore.get(this.projectStore.project.id)
  },
  methods: {
    backHome() {
      router.push('/')
    },
    // getTodos(){

    // }
    setModal(title, label, placeholder, method, type = 'text', defaultInput='') {
      this.modal.title = title
      this.modal.label = label
      this.modal.placeholder = placeholder
      this.modal.status = !this.modal.status
      this.modal.method = method
      this.modal.type = type
      this.modal.defaultInput = defaultInput
    },
    todoSubmit(val) {
      this.todoStore.add({ project_id: this.projectStore.project.id, description: val })
    },
    todoUpdate(val){
      this.todoStore.update(this.todoStore.todo.id, val)
    },
    modalTodo() {
      this.setModal('Tambah to-do baru', 'Nama list', 'Masukan nama', this.todoSubmit)
    },
    updateTodo(data){
      this.todoStore.todo = data
      this.setModal('Edit to-do', 'Nama list', 'Masukan nama', this.todoUpdate)
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
        console.log(status, response.status)
        setError(message, status);
      })
    },
    modalTeam() {
      this.setModal('Undang personil baru', 'Email', 'Masukan email', this.teamSubmit, 'email')
    },
    leaveProject() {
      this.teamStore.delete(this.projectStore.project.id)
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
        hour12: false // 24-hour format
      });
      return formattedDate.replace(',', '').replace(':', '.');

    }
  }
}
</script>