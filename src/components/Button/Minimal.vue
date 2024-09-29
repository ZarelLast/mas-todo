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
      const baseClasses = 'border py-3.5 px-8 text-Body-3 font-Semibold rounded-xl hover:bg-brand-lightHover hover:border-brand-lightHover hover:text-brand-normal'
      const variantClasses = {
        primary: 'border-brand-light bg-brand-light text-brand-normal',
        active: 'border-brand-lightActive bg-brand-lightActive text-brand-normal',
        disabled: 'border-base-BackgroundLight bg-base-BackgroundLight text-Text-300',
      }
      return `${baseClasses} ${variantClasses[this.intent]}`
    }
  }
}
</script>
