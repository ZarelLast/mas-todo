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
      const baseClasses = 'py-5 py-4 font-Semibold text-Body-3 rounded-2xl text-base-White hover:border-brand-normalHover hover:bg-brand-normalHover'
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
