<template>
  <div :class="{ 'z-50 block': modalStore.isOpen, 'hidden': !modalStore.isOpen }"
    class="bg-black bg-opacity-70 fixed inset-0 flex items-center justify-end px-4" @click.self="modalStore.closeModal">
    <div class="bg-white p-6 rounded-lg max-w-sm w-full h-[97.5vh]" @click.stop>
      <div class="flex justify-between items-center py-3">
        <h2 class="text-xl font-semibold">{{ modalStore.title }}</h2>
        <button @click="modalStore.closeModal" class="text-xl font-bold hover:text-red-600">
          <i class="ri-close-line" />
        </button>
      </div>
      <form :id="modalStore.label + modalStore.type + 123" class="space-y-6" action="" @submit.prevent="modalStore.submitData">
        <FormInput v-model="modalStore.inputVal" :id="modalStore.label + modalStore.type" :label="modalStore.label"
          :type="modalStore.type" :placeholder="modalStore.placeholder" />
        <ButtonPrimary intent="modalBtn" type="submit">
          {{ modalStore.submitMessage }}
        </ButtonPrimary>
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
}
</script>