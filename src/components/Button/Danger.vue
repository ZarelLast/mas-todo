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
      const baseClasses = 'border-2 p-2 rounded-md text-white hover:bg-W-600 hover:border-W-600'
      const variantClasses = {
        primary: 'border-W-500 bg-W-500',
        active: 'border-W-700 bg-W-700',
        disabled: 'border-Text-300 bg-Text-300'
      }
      return `${baseClasses} ${variantClasses[this.intent]}`
    }
  }
}
</script>
