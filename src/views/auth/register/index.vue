<template>
  <div class="flex items-center w-screen md:w-1/3 md:mx-auto h-screen">
    <div class="flex flex-col gap-y-6 w-full h-auto border py-[52px] px-6 rounded-[18px] shadow-md shadow-[#F0F3FF]">
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
            <FormInput v-model="formData.email" id="email" label="Email" type="email" placeholder="Masukan email..."
              leftIcon="ri-mail-line" />
            <FormInput v-model="formData.name" id="name" label="Name" type="text" placeholder="Masukan nama..."
              leftIcon="ri-user-line" />
            <FormInput v-model="formData.phone_number" id="phone_number" label="Nomor telepon" type="text"
              placeholder="Masukan nomor telepon..." leftIcon="ri-phone-line" />
            <FormInput v-model="formData.password" id="password" label="Password" :type="passwordFieldType"
              placeholder="Masukan password..." leftIcon="ri-lock-line" :rightIcon="passwordIconClass"
              :rightIconClick="togglePass" />
            <FormInput v-model="checkPass" id="passwordCheck" label="Masukan ulang password"
              :type="passwordCheckFieldType" placeholder="Masukan ulang password" leftIcon="ri-lock-line"
              :rightIcon="passwordCheckIconClass" :rightIconClick="toggleCheckPass"
              :class="[passwordsMatch ? 'border-border-hover' : '!border-W-500 text-W-500']" />
            <ButtonPrimary intent="auth" :type="'submit'">
              Daftar
            </ButtonPrimary>
            <div class="flex items-center justify-center">
              <div class="border-t border-gray-300 flex-grow"></div>
              <span class="mx-4">Sudah punya akun?</span>
              <div class="border-t border-gray-300 flex-grow"></div>
            </div>
            <ButtonSecondary intent="auth" @click="$router.push('/login')">
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
    passwordIconClass() {
      return this.showPass ? 'ri-eye-line' : 'ri-eye-off-line'
    },
    passwordCheckFieldType() {
      return this.showCheckPass ? 'text' : 'password'
    },
    passwordsMatch() {
      return this.checkPass === this.formData.password
    },
    passwordCheckIconClass() {
      return this.showCheckPass ? 'ri-eye-line' : 'ri-eye-off-line'
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
