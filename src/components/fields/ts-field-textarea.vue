<template>
  <label class="flex flex-col space-y-2">
    <span class="font-bold">
      <slot />
    </span>

    <textarea
      v-model.trim="localValue"
      class="ts-input pt-3"
      :class="{ 'invalid' : valid === false }"
      :rows="rows"
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
  name: 'ts-field-textarea',
  props: {
    rows: {
      type: Number,
      default: 5
    },

    valid: {
      type: Boolean,
      required: true
    },

    rules: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'update:valid', 'update:touched'],
  data: () => ({
    localValue: '',
    errorMessages: []
  }),
  methods: {
    update() {
      this.$emit('update:modelValue', this.localValue)
      this.$emit('update:touched', true)

      if(this.rules.length === 0) {
        this.$emit('update:valid', true)
        return
      }

      this.errorMessages = this.rules
        .map(rule => ValidationRules[rule](this.localValue))
        .filter(item => Boolean(item))

      const isValid = this.errorMessages.length === 0
      this.$emit('update:valid', isValid)
    }
  }
}
</script>
