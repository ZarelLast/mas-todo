<template>
  <!-- no project -->
  <div v-if="!projectStore.projects.length"
    class="flex items-center shadow shadow-{#F0F3FF} h-screen text-center align-middle">
    <div class="flex-1 flex flex-col py-3 px-9 items-center gap-3">
      <h1 class="font-semibold text-lg">Belum ada project</h1>
      <div class="w-1/4">
        <img :src="noproject" alt="" srcset="">
      </div>
      <p>Saat ini anda belum menambahkan project, buat project terlebih dahulu</p>
      <ButtonPrimary class="">
        Buat project
      </ButtonPrimary>
    </div>
  </div>

  <!-- project -->
  <div v-else class="flex flex-col gap-4">
    <!-- title -->
    <div class="flex-1 flex flex-row justify-between pt-6">
      <h1 class="font-bold text-2xl">Project</h1>
      <ButtonPrimary>
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
    <div class="flex-1 flex flex-wrap flex-row gap-3">
      <!-- card -->
      <div v-for="(project, index) in projectStore.projects"
        class="flex-1 flex flex-col flex-wrap gap-4 py-4 border shadow shadow-[#63636333]/20 rounded-3xl">
        <!-- title -->
        <div class="flex-1 flex flex-col gap-2 px-4">
          <h2>{{ project.name }}</h2>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <!-- <div class="bg-blue-600 h-2.5 rounded-full" :style="'width:'+(parseFloat(project.completed)/(parseFloat(project.completed) + parseFloat(project.incompleted)))*100+'%'"></div> -->
            <div class="bg-blue-600 h-2.5 rounded-full" :style="'width:'+projectStore.getProgress(project.id)+'%'"></div>
          </div>
          <div class="flex flex-row justify-between">
            <span>belum selesai</span>
            <span>{{parseInt(project.completed)}}/{{projectStore.getTotal(project.id)}} Selesai</span>
          </div>
        </div>
        <hr>
        <!-- list -->
        <div class="flex-1 flex flex-col gap-2 px-4">
          <ul>
            <li v-for="(item, index) in project.todo">
              <label>
                <input type="checkbox" @click="projectStore.updateCheckbox(project.id, item.id)" :checked="item.is_complete"> {{ item.description }}
                {{item}}
              </label>
            </li>
          </ul>
        </div>
        <div class="shrink-0 flex px-4">
          <ButtonPrimary class="flex-1 rounded-3xl">Lihat semua</ButtonPrimary>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { useProjectStore } from '@/stores/project.store';
import img1 from '@/assets/noproject.svg'

export default {
  data() {
    return {
      noproject: img1,
      projectStore: useProjectStore()
    }
  },
  beforeMount() {
    this.projectStore.fetch()
  }
}

</script>
