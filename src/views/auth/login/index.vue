<template>
  <div class="flex items-center w-screen md:w-1/3 md:mx-auto h-screen">
    <div class="flex flex-col gap-y-6 w-full h-auto border py-16 px-6 shadow-md shadow-[#F0F3FF]">
      <div class="flex-1">
        <img :src="logo" class="w-36" />
      </div>
      <div class="flex-1">
        <h1 class="font-semibold text-lg">Masuk</h1>
        <p>Masukan informasi login anda untuk mengakses aplikasi</p>
      </div>
      <div class="flex-1">
        <form action="" @submit.prevent="login">
          <div class="flex flex-col gap-y-3">
            <div class="flex-1">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
              <div class="relative flex items-center text-gray-400 focus-within:text-blue-500">
                <div class="absolute ml-3 left-0">
                  <i class="ri-mail-line w-5 h-5" />
                </div>
                <input v-model="formData.email" type="email" id="email"
                  class="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500  focus:ring-blue-500 block w-full p-2.5"
                  :class="{'border-red-500':formData.email == ''}"
                  placeholder="Masukan email..." required>
              </div>
            </div>
            <div class="flex-1">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
              <div class="relative flex items-center text-gray-400 focus-within:text-blue-500">
                <div class="absolute left-0 ml-3">
                  <i class="ri-lock-line w-5 h-5" />
                </div>
                <input v-model="formData.password" type="password" id="password"
                  class="bg-gray-50 border border-gray-300 px-10 text-gray-900 text-sm rounded-lg focus-within:ring-blue-500 focus-within:outline-blue-500 block w-full p-2.5"
                  placeholder="Masukan password..." required>
                <div class="absolute right-0 mr-3" @click="togglePass">
                  <i class="ri-eye-line w-5 h-5" :class="{ 'ri-eye-line': showPass, 'ri-eye-off-line': !showPass }" />
                  <!-- <i class="ri-eye-line w-5 h-5" :class="{showPass ? 'ri-eye-line':'ri-eye-off-line'}" /> -->
                </div>
              </div>
            </div>
            <ButtonPrimary :type="'submit'">
              Masuk
            </ButtonPrimary>
            <div class="flex items-center justify-center">
              <div class="border-t border-gray-300 flex-grow"></div>
              <span class="mx-4">Belum Punya Akun?</span>
              <div class="border-t border-gray-300 flex-grow"></div>
            </div>
            <ButtonSecondary @click="$router.push('/register')">
              Daftar
            </ButtonSecondary>
          </div>
        </form>
      </div>

    </div>
  </div>

</template>

<script>
import logoSvg from '@/assets/logo2.svg'

import {
  useAuthStore
} from "@/stores/auth.store.js"

export default {
  data() {
    return {
      showPass: false,
      logo: logoSvg,
      authStore: useAuthStore(),
      formData: {
        email: null,
        password: null,
      }
    }
  },
  methods: {
    togglePass() {
      this.showPass = !this.showPass
    },
    login() {
      this.authStore.login(this.formData)
    }
  }
}

</script>
