<template>
  <!-- Modal -->
  <Modal />
  <!-- no project -->
  <div v-if="!projectStore.projects.length"
    class="flex-1 flex items-center shadow shadow-{#F0F3FF} h-screen text-center align-middle">
    <div class="flex-1 flex flex-col py-3 px-9 items-center gap-3">
      <h1 class="font-semibold text-lg">Belum ada project</h1>
      <div class="w-1/4">
        <img :src="noproject" alt="" srcset="">
      </div>
      <p>Saat ini anda belum menambahkan project, buat project terlebih dahulu</p>
      <ButtonPrimary @click="modalProject">
        Buat project
      </ButtonPrimary>
    </div>
  </div>

  <!-- project -->
  <div v-else class="flex flex-col gap-4">
    <!-- title -->
    <div class="flex-1 flex flex-row justify-between pt-6">
      <h1 class="font-Bold text-Sub-Title-2">Project</h1>
      <ButtonPrimary @click="modalProject">
        + Buat project baru
      </ButtonPrimary>
    </div>

    <div class="flex-1 flex flex-row gap-3">
      <ButtonMinimal :intent="projectStore.completed ? 'disabled' : 'active'" @click="projectStore.completed = false">
        Semua
      </ButtonMinimal>
      <ButtonMinimal :intent="projectStore.completed ? 'active' : 'disabled'" @click="projectStore.completed = true">
        Terselesaikan
      </ButtonMinimal>
    </div>

    <!-- container -->
    <div class="flex-1 grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-3">
      <!-- card -->
      <div :id="project.id + index" v-for="(project, index) in fetchProject"
        class="flex flex-col flex-wrap gap-4 py-4 border shadow shadow-[#63636333]/20 rounded-3xl">
        <!-- title -->
        <div class="flex flex-col gap-2 px-4">
          <h2 class="font-Body-1 text-Bold">{{ project.name }}</h2>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-blue-600 h-2.5 rounded-full" :style="'width:' + projectStore.getProgress(project.id) + '%'">
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="flex-1 flex flex-row items-center gap-1">
              <span id="dot" class="h-2 w-2 rounded-full"
                :class="{ 'bg-A-600': project.incompleted > 0, 'bg-S-600': project.incompleted == 0 }"></span>
              <span class="font-medium text-A-600" :class="{ 'hidden': project.incompleted == 0 }">Belum selesai</span>
              <span class="font-medium text-S-600" :class="{ 'hidden': project.incompleted > 0 }">Selesai</span>
            </div>
            <div class="">
              <span>{{ parseInt(project.completed) }}/{{ projectStore.getTotal(project.id) }}</span> Selesai
            </div>
          </div>
        </div>
        <!-- list -->
        <span class="border-t-2"></span>
        <div class="flex-1 flex flex-col gap-2 px-4">
          <ul>
            <li v-for="(item, index) in project.todo.slice(0, 3)" :class="{ 'line-through': item.is_complete }">
              <label>
                <input class="" type="checkbox" @click="checkboxUpdate(project.id, item.id)"
                  :checked="item.is_complete">
                {{ item.description }}
              </label>
            </li>
          </ul>
        </div>
        <div class="shrink-0 flex px-4">
          <ButtonPrimary @click="toProjectDetails(project.id)" intent="details">Lihat semua</ButtonPrimary>
        </div>
      </div>
    </div>

    <div class="flex-1 flex justify-between">
      <div class="shrink-0">
        <p class="">
          Menampilkan
          <span>{{ ((projectStore.currentPage - 1) * projectStore.limitShow) + 1 }}</span>
          sampai
          <span>{{ projectStore.currentPage * projectStore.limitShow }}</span>
          dari
          <span>{{ projectStore.projects.length }}</span>
          keseluruhan
        </p>
      </div>
      <div class="shrink-0">
        <ul class="flex flex-row gap-2 rounded-xl">
          <li>
            <button @click="projectStore.currentPage--" class="rounded-md px-4 py-2 font-semibold"
              :class="{ 'bg-Text-200 text-Text-400': projectStore.currentPage == 1, 'bg-brand-normal text-Text-100': projectStore.currentPage > 1 }"
              :disabled="projectStore.currentPage <= 1">Prev</button>
          </li>
          <li v-for="index in projectStore.totalPages()">
            <button @click="projectStore.currentPage = index" class="rounded-md px-4 py-2 font-semibold"
              :class="{ 'bg-brand-normal text-Text-100': index == projectStore.currentPage, 'bg-Text-200 text-Text-400': index != projectStore.currentPage }">
              {{ index }}
            </button>
          </li>
          <li>
            <button @click="projectStore.currentPage++" class="rounded-md px-4 py-2 font-semibold"
              :class="{ 'bg-Text-200 text-Text-400': projectStore.currentPage == projectStore.totalPages(), 'bg-brand-normal text-Text-100': projectStore.currentPage < projectStore.totalPages() }"
              :disabled="projectStore.currentPage >= projectStore.totalPages()">Next</button>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import { useProjectStore } from '@/stores/project.store';
import { useTodoStore } from '@/stores/todo.store';
import { useModalStore } from '@/stores/modal.store';
import img1 from '@/assets/noproject.svg'

export default {
  data() {
    return {
      noproject: img1,
      projectStore: useProjectStore(),
      todoStore: useTodoStore(),
      modalStore: useModalStore(),
    }
  },
  beforeMount() {
    this.projectStore.fetch()
  },
  computed: {
    fetchProject() {
      this.projectStore.fetch()
      return this.projectStore.paginatedProjects()
    }
  },
  methods: {
    projectSubmit(val, setError) {
      setError()
      this.projectStore.add({ name: val })
    },
    modalProject() {
      this.modalStore.setModal('Tambah project baru', 'Nama project', 'Masukan nama project', this.projectSubmit);
    },
    checkboxUpdate(projectId, todoId) {
      this.projectStore.updateChecklist(projectId, todoId)
      const formData = this.projectStore.getTodo(projectId, todoId)
      this.todoStore.update(todoId, formData)
    },
    toProjectDetails(projectId) {
      this.projectStore.setProject(projectId)
      this.$router.push('/project/todo')
    }
  }
}

</script>
