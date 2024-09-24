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
      const baseClasses = 'border-2 p-2 rounded-md text-white hover:border-brand-normalHover hover:bg-brand-normalHover'
      const variantClasses = {
        primary: 'border-brand-normal bg-brand-normal',
        active: 'border-brand-normalActive bg-brand-normalActive',
        disabled: 'border-Text-300 bg-Text-300'
      }
      return `${baseClasses} ${variantClasses[this.intent]}`
    }
  }
}
</script>
