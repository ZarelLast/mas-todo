<template>
  <button :class="buttonClass" :type="type">
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
    intent:{
      type: String,
      default: 'primary'
    }
  },
  computed:{
    buttonClass(){
      const baseClasses = 'border py-5 py-4 font-Semibold text-Body-3 rounded-2xl hover:text-blue-500 hover:border-blue-500'
      const variantClasses = {
        primary: 'border-blue-400 text-blue-400',
        active: 'border-blue-400 text-blue-400',
        disabled: 'border-light text-light'
      }
      return `${baseClasses} ${variantClasses[this.intent]}`
    }
  }
}
</script>
