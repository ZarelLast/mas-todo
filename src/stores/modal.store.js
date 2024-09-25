import { defineStore } from "pinia";
import { axiosWrapper } from "../helper/axios-wrapper";

// const base

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    title: '',
    label: '',
    placeholder: '',
    isOpen: false,
    onSubmit: null,
    type: '',
    inputVal: '',
    errorMessage: '',
    errorStatus: false
  }),
  actions: {
    setModal(title = 'No title', label = 'Input', placeholder = 'placeholder', method = console.log('halo'), type = 'text', defaultInput = '') {
      this.title = title
      this.label = label
      this.placeholder = placeholder
      this.isOpen = !this.isOpen
      this.method = method
      this.type = type
      this.defaultInput = defaultInput
    },
    closeModal() {
      this.isOpen = false;
      this.inputVal = ''
      this.errorMessage = ''
      this.errorStatus = false
    },
    setError(message='', status=false) {
      this.errorMessage = message;
      console.log('status setError',status)
      this.errorStatus = status

      if(this.errorStatus == false){
        this.closeModal()
      }
    },

    submitData() {
      this.onSubmit(this.inputVal, this.setError)
    }
  }
})