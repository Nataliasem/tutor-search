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

    <span v-if="!valid" class="text-red-400">Should not be empty</span>
  </label>
</template>

<script>
export default {
  name: 'ts-field-textarea',
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },

    valid: {
      type: Boolean,
      required: true
    },

    rows: {
      type: Number,
      default: 5
    },

    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'update:valid', 'update:touched'],
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
      this.$emit('update:touched', true)

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