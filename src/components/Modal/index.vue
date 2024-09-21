<template>
  <div :class="{ 'z-50 block': status, 'hidden': !status }"
    class="bg-black bg-opacity-70 fixed inset-0 flex items-center justify-end px-4" @click.self="closeModal">
    <div class="bg-white p-6 rounded-lg max-w-sm w-full h-[97.5vh]" @click.stop>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <button @click="closeModal" class="text-xl font-bold hover:text-red-600">
          <i class="ri-close-line" />
        </button>
      </div>
      <form class="space-y-6" action="" @submit.prevent="submitData">
        <div>
          <label for="listName" class="block text-sm font-medium text-gray-700">{{ label }}</label>
          <input id="listName" type="text" v-model="inputVal" :placeholder="placeholder"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="errorMessage" class="mt-2 text-sm text-red-600">{{ errorMessage }}</p>
        </div>
        <button type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Tambahkan
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useProjectStore } from '@/stores/project.store';
import { useTodoStore } from '../../stores/todo.store';
export default {
  props: {
    title: String,
    label: String,
    placeholder: String,
    status: Boolean,
    onSubmit: Function
  },
  data() {
    return {
      projectStore: useProjectStore(),
      todoStore: useTodoStore(),
      inputVal: '',
      errorMessage: ''
    }
  },
  computed: {
    // searchMember(val){
    //   return this.teams.filter((member)=> member.includes(val))
    // },
  },
  methods: {
    closeModal() {
      this.$parent.modal.status = false;
      this.inputVal = ''
      this.errorMessage = ''
    },
    setError(message) {
      this.errorMessage = message;
    },
    submitData() {
      // if (this.target == 'todo'){
      //   this.todoStore.add(this.projectStore.project.id, this.inputVal)
      // }else if (this.target == 'personil'){
      //   this.projectStore.add({name: this.inputVal})
      // }else{
      //   this.projectStore.add({name: this.inputVal})
      // }
      this.onSubmit(this.inputVal, this.setError)
      this.closeModal()
    }
  }
}
</script>