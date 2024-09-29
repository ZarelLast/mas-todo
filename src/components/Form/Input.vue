<template>
  <div class="flex-1 flex flex-col gap-[5px]">
    <label :for="$attrs.id" class="block text-Body-3 font-Medium text-Text-500">{{ label }}</label>
    <div class="relative flex items-center text-Body-3 text-Text-300 focus-within:text-brand-normal">
      <div v-if="leftIcon" class="absolute ml-5 left-0">
        <i class="w-5 h-5" :class="leftIcon" />
      </div>
      <input
        :type="type"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="inputClass"
        :placeholder="placeholder"
        required
      />
      <div v-if="rightIcon" class="absolute right-0 mr-5" @click="rightIconClick">
        <i class="w-5 h-5" :class="rightIcon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Masukan Teks'
    },
    type: {
      type: String,
      default: 'text'
    },
    leftIcon: {
      type: String,
      default: null
    },
    rightIcon: {
      type: String,
      default: null
    },
    rightIconClick: {
      type: Function,
      default: null
    },
  },
  computed: {
    inputClass() {
      const baseClass = 'bg-gray-50 border border-gray-300 rounded-2xl w-full py-4'
      const textClass = 'text-Text-500 text-Body-3 font-Reguler'
      const focusClass  = 'focus:outline-brand-normal focus:ring-brand-normal focus:text-Text-500 block'
      const paddingClass = this.leftIcon ? 'px-11' : 'px-5'
      // const borderClass = this.modelValue === '' ? 'border-W-500' : 'border-border-hover';
      return `${baseClass} ${textClass} ${paddingClass} ${focusClass}`
    }
  }
}
</script>