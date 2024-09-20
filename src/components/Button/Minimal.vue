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
      const baseClasses = 'border-2 p-2 rounded-md hover:bg-blue-50 hover:border-blue-50'
      const variantClasses = {
        primary: 'border-white bg-white text-blue-500',
        active: 'border-blue-100 bg-blue-100 text-blue-500',
        disabled: 'border-white bg-white text-grey-500',
      }
      return `${baseClasses} ${variantClasses[this.intent]}`
    }
  }
}
</script>
