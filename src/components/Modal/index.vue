<template>
  <div :class="{ 'z-50 block': modalStore.isOpen, 'hidden': !modalStore.isOpen }"
    class="bg-black bg-opacity-70 fixed inset-0 flex items-center justify-end px-4" @click.self="modalStore.closeModal">
    <div class="bg-white p-6 rounded-lg max-w-sm w-full h-[97.5vh]" @click.stop>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <button @click="modalStore.closeModal" class="text-xl font-bold hover:text-red-600">
          <i class="ri-close-line" />
        </button>
      </div>
      <form class="space-y-6" action="" @submit.prevent="modalStore.submitData">
        <div>
          <label for="listName" class="block text-sm font-medium text-gray-700">{{ modalStore.label }}</label>
          <input id="listName" :type="modalStore.type" v-model="modalStore.inputVal" :placeholder="modalStore.placeholder"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Tambahkan
        </button>
        <div v-if="modalStore.errorMessage" class="border rounded-2xl py-6 px-5 border-W-500 bg-W-100">
          <p class="text-sm text-red-600">{{ modalStore.errorMessage }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useModalStore } from '@/stores/modal.store';

export default {
  data() {
    return {
      modalStore: useModalStore(),
    }
  },
  computed: {
    // searchMember(val){
    //   return this.teams.filter((member)=> member.includes(val))
    // },
  },
  methods: {
    
  }
}
</script>