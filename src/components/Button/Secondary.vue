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
      const baseClass = 'py-3.5 px-8 rounded-2xl text-brand-normal border border-brand-normal'
      const textClass = 'font-Semibold text-Body-3'
      const hoverClass = 'hover:text-brand-normalHover hover:border-brand-normalHover'
      const variantClass = {
        primary: 'border-brand-normal text-brand-normal',
        active: 'border-brand-normalActive text-brand-normalActive',
        disabled: 'border-Text-300 bg-Text-300',
        auth: '!px-5 !py-4 border-brand-normalActive text-brand-normalActive',
        modal: '!p-4 border-brand-normalActive text-brand-normalActive',
        details: '!px-4 !py-3 border-brand-normalActive text-brand-normalActive',
      }
      return `${baseClass} ${textClass} ${hoverClass} ${variantClass[this.intent]}`
    }
  }
}
</script>
