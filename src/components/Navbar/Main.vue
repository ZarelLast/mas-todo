<template>
  <div class="flex flex-row py-3 px-9 justify-between shadow shadow-{#F0F3FF}">
    <img :src="logo" alt="" srcset="">
    <div class="flex flex-nowrap flex-row items-center py-2 gap-x-3 rounded-3xl">
      <span @click="logout" class="inline-block align-middle">{{ this.userStore.users.name }}</span>
      <div>
        <div class="w-10 h-10 bg-blue-500 rounded-full">
        </div>
        <!-- <img src="" alt="" srcset=""> -->
      </div>
    </div>
  </div>
</template>

<script>
import logoSvg from '@/assets/logo2.svg'
import { useUserStore } from '@/stores/user.store';
import { useAuthStore } from '../../stores/auth.store';
const image = new Image()
image.src = logoSvg
export default {
  data() {
    return {
      logo: image.src,
      userStore: useUserStore(),
      authStore: useAuthStore()
    }
  },
  beforeMount() {
    this.userStore.fetch()
  },
  methods: {
    logout() {
      this.authStore.logout()
    },
    check() {
      console.log()
    }
  }
}

</script>