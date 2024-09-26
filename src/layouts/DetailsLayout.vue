<template>
  <div class="flex flex-col gap-2 p-5 h-screen">
    <Modal />
    <NavbarMain />
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

      <div class="flex flex-row gap-2">
        <ButtonMinimal @click="$router.push('/project/todo'), pageNow=0" :intent="pageNow ? 'disabled': 'active'">
          To-do list
        </ButtonMinimal>
        <ButtonMinimal @click="$router.push('/project/team'), pageNow=1" :intent="pageNow ? 'active': 'disabled'">
          Personil
        </ButtonMinimal>
      </div>

      <slot />
    </div>

  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js"
import { useProjectStore } from '@/stores/project.store';
import { useTodoStore } from '@/stores/todo.store';
import { useTeamStore } from '@/stores/team.store';
import { useModalStore } from '@/stores/modal.store';
import router from '@/router/index.js'

export default {
  name: 'DetailsLayout',
  data() {
    return {
      authStore: useAuthStore(),
      projectStore: useProjectStore(),
      todoStore: useTodoStore(),
      teamStore: useTeamStore(),
      modalStore: useModalStore(),
      pageNow: 0
    }
  },
  beforeMount() {
    this.teamStore.get(this.projectStore.project.id)
    this.todoStore.projectId = this.projectStore.project.id
  },
  computed(){
    this.projectStore.fetch(),
    this.projectStore.setProject(this.projectStore.project.id),
    this.todoStore.todos = this.projectStore.project.todo
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
    }
  }
};
</script>
