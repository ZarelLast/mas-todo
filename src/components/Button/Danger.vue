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
    intent: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    buttonClass(){
      const baseClass = 'py-3.5 px-8 rounded-2xl'
      const textClass = 'font-Semibold text-Body-3 text-base-White'
      const hoverClass= 'hover:bg-W-600 hover:border-W-600'
      const variantClass = {
        primary: 'border-W-500 bg-W-500',
        active: 'border-W-700 bg-W-700',
        disabled: 'border-Text-300 bg-Text-300'
      }
      return `${baseClass} ${textClass} ${hoverClass} ${variantClass[this.intent]}`
    }
  }
}
</script>
