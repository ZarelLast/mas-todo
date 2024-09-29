<template>
  <Modal />
  <div class="flex flex-col gap-2 p-5 h-screen">
    <NavbarMain />
    <div class="flex flex-col gap-4">
      <!-- secondary -->
      <div class="flex-1 flex flex-row justify-between pt-6">
        <!-- title -->
        <div class="flex flex-col">
          <div class="text-sm" @click="toHome">
            <i class="ri-arrow-left-s-line" />
            <span>kembali</span>
          </div>
          <h1 class="font-Bold text-Sub-Title-2">{{ projectStore.project.name }}</h1>
        </div>
        <!-- button action -->
        <div class="flex flex-row gap-2">
          <ButtonPrimary @click="modalTodo">+ Tambah to-do</ButtonPrimary>
          <ButtonPrimary @click="modalTeam">+ Undang personil</ButtonPrimary>
          <ButtonDanger @click="leaveProject">Keluar project</ButtonDanger>
        </div>
      </div>

      <div class="flex-1 flex flex-row gap-3">
        <ButtonMinimal :intent="pageNow ? 'disabled' : 'active'" @click="$router.push('/project/todo'), pageNow = 0">
          To-do list
        </ButtonMinimal>
        <ButtonMinimal :intent="pageNow ? 'active' : 'disabled'" @click="$router.push('/project/team'), pageNow = 1">
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
    if (this.projectStore.project === null) {
      this.toHome()
    } else {
      this.teamStore.get(this.projectStore.project.id)
      this.todoStore.projectId = this.projectStore.project.id
    }
  },
  mounted() {

  },
  computed: {
    // this.projectStore.fetch(),
    // this.projectStore.setProject(this.projectStore.project.id),
    // this.todoStore.todos = this.projectStore.project.todo
  },
  methods: {
    toHome() {
      this.$router.push({ path: '/' }).then(() => this.$router.go(0))
    },
    todoSubmit(val, setError) {
      this.todoStore.add({ project_id: this.projectStore.project.id, description: val })
      setError()
    },
    modalTodo() {
      this.modalStore.setModal('Tambah to-do baru', 'Nama list', 'Masukan nama', this.todoSubmit)
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
      this.teamStore.deleteAlert(this.projectStore.project.name, this.projectStore.project.id, this.$swal, this.toHome)
    }
  },
};
</script>
