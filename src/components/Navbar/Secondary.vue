<template>
  <div>
    <!-- Modal -->
    <Modal :title="modal.title" :label="modal.label" :placeholder="modal.placeholder" :onSubmit="modal.method"
      :status.sync="modal.status" :type="modal.type" />

    <!-- {{ console.log(projectStore.projects) }} -->
    <!-- projects -->
    <!-- no project -->
    <div v-if="pageNow == 'menu'">
      <div v-if="projectStore.projects.length == 0"
        class="flex-1 flex items-center shadow shadow-{#F0F3FF} h-screen text-center align-middle">
        <div class="flex-1 flex flex-col py-3 px-9 items-center gap-3">
          <h1 class="font-semibold text-lg">Belum ada project</h1>
          <div class="w-1/4">
            <img :src="noproject" alt="" :srcset="noproject">
          </div>
          <p>Saat ini anda belum menambahkan project, buat project terlebih dahulu</p>
          <ButtonPrimary @click="modalProject">
            Buat project
          </ButtonPrimary>
        </div>
      </div>

      <!-- secondary -->
      <div v-else class="flex-1 flex flex-col">
        <!-- title -->
        <div class="flex-1 flex flex-row justify-between pt-6">
          <h1 class="font-bold text-2xl">Project</h1>
          <ButtonPrimary @click="modalProject">
            + Buat project baru
          </ButtonPrimary>
        </div>

        <div class="flex flex-row gap-3">
          <!-- <ButtonMinimal :intent="{'active':projectStore.completed, 'disabled':!projectStore.completed}" @click="projectStore.completed=false"> -->
          <ButtonMinimal :intent="projectStore.completed ? 'disabled' : 'active'"
            @click="projectStore.completed = false, pageNow = 'menu'">
            Semua
          </ButtonMinimal>
          <ButtonMinimal :intent="projectStore.completed ? 'active' : 'disabled'"
            @click="projectStore.completed = true, pageNow = 'menu'">
            Terselesaikan
          </ButtonMinimal>
        </div>

      </div>
    </div>
    <!-- todo & member -->
    <div v-if="pageNow = 'details' && projectStore.project != null">
      <div class="flex-1 flex flex-col gap-2 px-4">
        <!-- secondary -->
        <div class="shrink-0 flex flex-row justify-between">
          <!-- title -->
          <div class="flex flex-col">
            <div class="text-sm" @click="backHome, pageNow = 'menu'">
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
          <ButtonMinimal @click="$router.push('/project/todo'), pageNow = 'details'" intent="active">
            To-do list
          </ButtonMinimal>
          <ButtonMinimal @click="$router.push('/project/team'), pageNow = 'details'" intent="disabled">
            Personil
          </ButtonMinimal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProjectStore } from '@/stores/project.store';
import { useTodoStore } from '@/stores/todo.store';
import { useTeamStore } from '@/stores/team.store';
import router from '@/router/index.js'

import img1 from '@/assets/noproject.svg'

export default {
  data() {
    return {
      noproject: img1,
      projectStore: useProjectStore(),
      todoStore: useTodoStore(),
      pageNow: 'menu',
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
    this.projectStore.fetch()
  },
  computed: {

  },
  methods: {
    setModal(title, label, placeholder, method, type = 'text', defaultInput = '') {
      this.modal.title = title
      this.modal.label = label
      this.modal.placeholder = placeholder
      this.modal.status = !this.modal.status
      this.modal.method = method
      this.modal.type = type
      this.modal.defaultInput = defaultInput
    },
    projectSubmit(val, setError) {
      setError()
      this.projectStore.add({ name: val })
    },
    modalProject() {
      this.setModal('Tambah project baru', 'Nama nama project', 'Masukan nama project', this.projectSubmit);
    },
    todoSubmit(val, setError) {
      this.todoStore.add({ project_id: this.projectStore.project.id, description: val })
      setError()
    },
    todoUpdate(val) {
      this.todoStore.update(this.todoStore.todo.id, val)
    },
    modalTodo() {
      this.setModal('Tambah to-do baru', 'Nama list', 'Masukan nama', this.todoSubmit)
    },
    updateTodo(data) {
      this.todoStore.todo = data
      this.setModal('Edit to-do', 'Nama list', 'Masukan nama', this.todoUpdate)
    },
    delTodo(id) {
      this.todoStore.delete(id)
    },
    teamSubmit(val, setError) {
      const response = this.teamStore.add({ project_id: this.projectStore.project.id, email: val })

      // minus jika sudah join maka tetep keluar ini
      response.then((res) => {
        let message = ''
        let status = false
        if (res.status == 404) {
          message = "Personil yang anda input tidak terdaftar!"
          status = true
        }
        console.log(status, res.status)
        setError(message, status);
      })
    },
    modalTeam() {
      this.setModal('Undang personil baru', 'Email', 'Masukan email', this.teamSubmit, 'email')
    },
    leaveProject() {
      this.teamStore.delete(this.projectStore.project.id)
    },
    backHome() {
      router.push('/')
    },
  }
}

</script>