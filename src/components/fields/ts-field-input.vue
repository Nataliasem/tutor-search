<template>
  <label class="flex flex-col space-y-2">
    <span class="font-bold">
      <slot />
    </span>

    <input
      v-model.trim="localValue"
      class="ts-input"
      :class="{ 'invalid' : !valid }"
      :type="type"
      @blur="update"
    />

    <template v-if="valid === false">
      <div v-for="error in errorMessages" :key="error" class="text-red-400">{{ error }}</div>
    </template>
  </label>
</template>

<script>
import ValidationRules from './validation-rules'

export default {
  name: 'ts-field-input',
  props: {
    valid: {
      type: Boolean,
      required: true
    },

    type: {
      type: String,
      default: 'string'
    },

    rules: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'update:valid'],
  data: () => ({
    localValue: '',
    errorMessages: []
  }),
  methods: {
    update() {
      if(this.rules.length === 0) {
        this.$emit('update:modelValue', this.localValue)
        this.$emit('update:valid', true)
        return
      }

      this.errorMessages = this.rules
        .map(rule => ValidationRules[rule](this.localValue))
        .filter(item => Boolean(item))

      if(this.errorMessages.length === 0) {
        this.$emit('update:modelValue', this.localValue)
        this.$emit('update:valid', true)
      } else {
        this.$emit('update:valid', false)
      }
    }
  }
};
</script>