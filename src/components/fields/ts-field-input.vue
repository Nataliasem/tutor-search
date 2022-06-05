<template>
  <label class="flex flex-col space-y-2">
    <span class="font-bold">
      <slot />
    </span>

    <input
      v-model.trim="localValue"
      class="ts-input"
      :class="{ invalid: valid === false }"
      :type="type"
      @blur="update"
    />

    <template v-if="valid === false">
      <div v-for="error in errorMessages" :key="error" class="text-red-400">
        {{ error }}
      </div>
    </template>
  </label>
</template>

<script>
import ValidationRules from './validation-rules'

export default {
  name: 'ts-field-input',
  props: {
    type: {
      type: String,
      default: 'string'
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
    localValue: null,
    errorMessages: []
  }),
  computed: {
    formattedValue() {
      return this.type === 'number' ? Number(this.localValue) : this.localValue
    }
  },
  methods: {
    update() {
      this.$emit('update:modelValue', this.formattedValue)
      this.$emit('update:touched', true)

      if (this.rules.length === 0) {
        this.$emit('update:valid', true)
        return
      }

      this.errorMessages = this.rules
        .map((rule) => ValidationRules[rule](this.formattedValue))
        .filter((item) => Boolean(item))

      const isValid = this.errorMessages.length === 0
      this.$emit('update:valid', isValid)
    }
  }
}
</script>
