<template>
  <label class="flex flex-col space-y-2">
    <span class="font-bold">
      <slot />
    </span>

    <input
      v-model.trim="localValue"
      class="ts-input"
      :class="{ 'invalid' : valid === false }"
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
      if(this.type === 'number') {
        this.localValue = Number(this.localValue)
      }

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
};
</script>