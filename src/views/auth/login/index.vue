<template>
  <div class="flex items-center w-screen md:w-1/3 md:mx-auto h-screen">
    <div class="flex flex-col gap-y-6 w-full h-auto border py-[52px] px-6 rounded-[18px] shadow-md shadow-[#F0F3FF]">
      <div class="flex-1">
        <img :src="logo" class="w-36" />
      </div>
      <div class="flex-1 flex flex-col gap-1">
        <h1 class="font-Semibold text-Sub-Title-1">Masuk</h1>
        <p class="font-Reguler text-Body-3">Masukan informasi login anda untuk mengakses aplikasi</p>
      </div>
      <div class="flex-1">
        <form action="" @submit.prevent="login">
          <div class="flex flex-col gap-y-3">
            <FormInput v-model="formData.email" id="email" label="Email" type="email" placeholder="Masukan email..."
              leftIcon="ri-mail-line" />
            <FormInput v-model="formData.password" id="password" label="Password" :type="passwordFieldType"
              placeholder="Masukan password..." leftIcon="ri-lock-line" :rightIcon="passwordIconClass"
              :rightIconClick="togglePass" />
            <ButtonPrimary intent="auth" :type="'submit'">
              Masuk
            </ButtonPrimary>
            <div class="flex items-center justify-center">
              <div class="border-t border-gray-300 flex-grow"></div>
              <span class="mx-4 font-Medium text-Body-3">Belum Punya Akun?</span>
              <div class="border-t border-gray-300 flex-grow"></div>
            </div>
            <ButtonSecondary intent="auth" @click="$router.push('/register')">
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
  },
  computed: {
    passwordFieldType() {
      return this.showPass ? 'text' : 'password'
    },
    passwordIconClass() {
      return this.showPass ? 'ri-eye-line' : 'ri-eye-off-line'
    },
  }
}

</script>
