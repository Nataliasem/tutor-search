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

    <span v-if="!valid" class="text-red-400">Should not be empty</span>
  </label>
</template>

<script>
export default {
  name: 'ts-field-input',
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },

    valid: {
      type: Boolean,
      required: true
    },

    type: {
      type: String,
      default: 'string'
    },

    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'update:valid'],
  data: () => ({
    localValue: ''
  }),
  watch: {
      value() {
        this.localValue = this.modelValue
      }
  },
  methods: {
    update() {
      if(this.required && !this.localValue) {
        this.$emit('update:valid', false)
        return
      }

      this.$emit('update:modelValue', this.localValue)
      this.$emit('update:valid', true)
    }
  }
};
</script>