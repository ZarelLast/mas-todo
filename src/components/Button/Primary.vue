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
      const baseClass = 'py-3.5 px-8 rounded-2xl'
      const textClass = 'font-Semibold text-Body-3 text-base-White'
      const hoverClass= 'hover:border-brand-normalHover hover:bg-brand-normalHover'
      const variantClass = {
        primary: 'border-brand-normal bg-brand-normal',
        active: 'border-brand-normalActive bg-brand-normalActive',
        disabled: 'border-Text-300 bg-Text-300',
        auth: '!px-5 !py-4 border-brand-normalActive bg-brand-normalActive',
        modalBtn: '!p-4 w-full border-brand-normal bg-brand-normal flex-1',
        details: '!px-4 !py-3 border-brand-normal bg-brand-normal flex-1'
      }
      return `${baseClass} ${textClass} ${hoverClass} ${variantClass[this.intent]}`
    }
  }
}
</script>
