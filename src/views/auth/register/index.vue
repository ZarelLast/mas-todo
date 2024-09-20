<template>
  <div class="flex items-center w-screen md:w-1/3 md:mx-auto h-screen">
    <div class="flex flex-col gap-y-6 w-full h-auto border py-16 px-6 shadow-md shadow-[#F0F3FF]">
      <div class="flex-1">
        <img :src="logo" class="w-36" />
      </div>
      <div class="flex-1">
        <h1 class="font-semibold text-lg">Daftar</h1>
        <p>Masukan informasi anda untuk mendaftar di aplikasi</p>
      </div>
      <div class="flex-1">
        <form action="" @submit.prevent="register">
          <div class="flex flex-col gap-y-3">
            <div class="flex-1">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
              <div class="relative flex items-center text-gray-400 focus-within:text-blue-500">
                <div class="absolute ml-3 left-0">
                  <i class="ri-mail-line w-5 h-5" />
                </div>
                <input v-model="formData.email" type="email" id="email"
                  class="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500  focus:ring-blue-500 block w-full p-2.5"
                  placeholder="Masukan email..." required>
              </div>
            </div>
            <div class="flex-1">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Nama</label>
              <div class="relative flex items-center text-gray-400 focus-within:text-blue-500">
                <div class="absolute left-0 ml-3">
                  <i class="ri-user-line w-5 h-5" />
                </div>
                <input v-model="formData.name" type="name" id="name"
                  class="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5"
                  placeholder="Masukan nama..." required>
              </div>
            </div>
            <div class="flex-1">
              <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 ">Nomor telepon</label>
              <div class="relative flex items-center text-gray-400 focus-within:text-blue-500">
                <div class="absolute left-0 ml-3">
                  <i class="ri-phone-line w-5 h-5" />
                </div>
                <input v-model="formData.phone_number" type="text" id="phone_number"
                  class="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5"
                  placeholder="Masukan nomor telepon..." required>
              </div>
            </div>
            <div class="flex-1">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
              <div class="relative flex items-center text-gray-400 focus-within:text-blue-500">
                <div class="absolute left-0 ml-3">
                  <i class="ri-lock-line w-5 h-5" />
                </div>
                <input v-model="formData.password" :type="passwordFieldType" id="password"
                  class="px-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5"
                  placeholder="Masukan password..." required>
                <div class="absolute right-0 mr-3" @click="togglePass">
                  <i class="ri-eye-line w-5 h-5" :class="{ 'ri-eye-line': showPass, 'ri-eye-off-line': !showPass }" />
                </div>
              </div>
            </div>
            <div class="flex-1">
              <label for="passwordCheck" class="block mb-2 text-sm font-medium text-gray-900 ">Masukan ulang
                password</label>
              <div class="relative flex items-center text-gray-400 focus-within:text-blue-500" :class="{'text-red-500': formData.password !== checkPass}">
                <div class="absolute left-0 ml-3">
                  <i class="ri-lock-line w-5 h-5" />
                </div>
                <input v-model="checkPass" :type="passwordCheckFieldType" id="passwordCheck"
                  class="px-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-within:ring-blue-500 focus-within:outline-blue-500 block w-full p-2.5 "
                  :class="{'border-red-500': formData.password !== checkPass}" placeholder="Masukan ulang password..." required>
                <div class="absolute right-0 mr-3" @click="toggleCheckPass">
                  <i class="ri-eye-line w-5 h-5"
                    :class="{ 'ri-eye-line': showCheckPass, 'ri-eye-off-line': !showCheckPass }" />
                </div>
              </div>
            </div>
            <ButtonPrimary :type="'submit'">
              Daftar
            </ButtonPrimary>
            <div class="flex items-center justify-center">
              <div class="border-t border-gray-300 flex-grow"></div>
              <span class="mx-4">Sudah punya akun?</span>
              <div class="border-t border-gray-300 flex-grow"></div>
            </div>
            <ButtonSecondary @click="$router.push('/login')" class="">
              Masuk
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
      showCheckPass: false,
      checkPass: null,
      logo: logoSvg,
      authStore: useAuthStore(),
      formData: {
        name: null,
        email: null,
        phone_number: null,
        password: null,
      }
    }
  },
  computed: {
    passwordFieldType() {
      return this.showPass ? 'text' : 'password'
    },
    passwordCheckFieldType() {
      return this.showCheckPass ? 'text' : 'password'
    },
  },
  methods: {
    togglePass() {
      this.showPass = !this.showPass
    },
    toggleCheckPass() {
      this.showCheckPass = !this.showCheckPass
    },
    async register() {
      await this.authStore.register(this.formData)
    }
  }
}

</script>
