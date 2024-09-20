<template>
  <button class="border-2 border-blue-400 p-2 rounded-md text-blue-400 hover:text-blue-500 hover:border-blue-500" :type="type">
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
  }
}
</script>
