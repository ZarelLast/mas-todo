<template>
  <!-- Modal -->
  <Modal :title="modal.title" :label="modal.label" :placeholder="modal.placeholder" :onSubmit="modal.method"
    :status.sync="modal.status" />

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
      <h1 class="font-bold text-2xl">Project</h1>
      <ButtonPrimary @click="modalProject">
        + Buat project baru
      </ButtonPrimary>
    </div>

    <div class="flex-1 flex flex-row gap-2">
      <ButtonMinimal intent="active">
        Semua
      </ButtonMinimal>
      <ButtonMinimal intent="disabled">
        Terselesaikan
      </ButtonMinimal>
    </div>

    <!-- container -->
    <div class="flex-1 grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-3">
      <!-- card -->
      <div v-for="(project, index) in projectStore.paginatedProjects()"
        class="flex flex-col flex-wrap gap-4 py-4 border shadow shadow-[#63636333]/20 rounded-3xl">
        <!-- title -->
        <div class="flex flex-col gap-2 px-4">
          <h2>{{ project.name }}</h2>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <!-- <div class="bg-blue-600 h-2.5 rounded-full" :style="'width:'+(parseFloat(project.completed)/(parseFloat(project.completed) + parseFloat(project.incompleted)))*100+'%'"></div> -->
            <div class="bg-blue-600 h-2.5 rounded-full" :style="'width:' + projectStore.getProgress(project.id) + '%'">
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <span>belum selesai</span>
            <span>{{ parseInt(project.completed) }}/{{ projectStore.getTotal(project.id) }} Selesai</span>
          </div>
        </div>
        <hr>
        <!-- list -->
        <div class="flex-1 flex flex-col gap-2 px-4">
          <ul>
            <li v-for="(item, index) in project.todo" :class="{ 'line-through': item.is_complete }">
              <label>
                <input class="" type="checkbox" @click="checkboxUpdate(project.id, item.id)"
                  :checked="item.is_complete">
                {{ item.description }}
              </label>
            </li>
          </ul>
        </div>
        <div class="shrink-0 flex px-4">
          <ButtonPrimary @click="toProjectDetails(project.id)" class="flex-1 rounded-3xl">Lihat semua</ButtonPrimary>
        </div>
      </div>
    </div>

    <div class="flex-1 flex justify-end">
      <ul class="flex flex-row border-2 border-blue-500 divide-x-2 divide-blue-500 rounded-xl shadow">
        <button @click="projectStore.currentPage--" :disabled="projectStore.currentPage <= 1"
          class="px-3 py-2 hover:bg-blue-100">prev</button>
        <li v-for="index in projectStore.totalPages()" @click="projectStore.currentPage = index"
          :class="{ 'bg-blue-300': index == projectStore.currentPage, 'hover:bg-blue-100': index != projectStore.currentPage }"
          class="px-3 py-2 ">{{ index }}</li>
        <button @click="projectStore.currentPage++" :disabled="projectStore.currentPage >= projectStore.totalPages()"
          class="px-3 py-2 hover:bg-blue-100">next</button>
      </ul>
    </div>
  </div>

</template>

<script>
import { useProjectStore } from '@/stores/project.store';
import { useTodoStore } from '@/stores/todo.store';
import img1 from '@/assets/noproject.svg'

export default {
  data() {
    return {
      noproject: img1,
      projectStore: useProjectStore(),
      todoStore: useTodoStore(),
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
    // this.projectStore.fetch()
  },
  methods: {
    setModal(title, label, placeholder, method) {
      this.modal.title = title
      this.modal.label = label
      this.modal.placeholder = placeholder
      this.modal.status = !this.modal.status
      this.modal.method = method
    },
    projectSubmit(val) {
      this.projectStore.add({ name: val })
    },
    modalProject() {
      this.setModal('Tambah project baru', 'Nama nama project', 'Masukan nama project', this.projectSubmit);
    },
    checkboxUpdate(projectId, todoId) {
      this.projectStore.updateCheckbox(projectId, todoId)
      const formData = this.projectStore.getTodo(projectId, todoId)
      this.todoStore.update(todoId, formData)
    },
    toProjectDetails(projectId) {
      this.projectStore.setProject(projectId)
      this.todoStore.todos = this.projectStore.project.todo
    }
  }
}

</script>
