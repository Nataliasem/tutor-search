<template>
  <div class="ts-card px-6">
    <form @submit.prevent="validate">
      <div class="flex flex-col space-y-8">
        <slot />
      </div>
        <button type="submit" class="ts-button-main mt-8" :disabled="disabled">{{ submitText }}</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ts-form',
  props: {
    formSchema: {
      type: Object,
      required: true
    },
    submitText: {
      type: String,
      default: 'Save'
    },
    saving: {
      type: Boolean,
      default: false
    }
  },
  emits: ['validate'],
  computed: {
    isValid() {
      const validatedFields = Object.values(this.formSchema)

      return validatedFields.every(item => item.valid && item.touched)
    },

    disabled() {
      return this.saving || this.isValid === false
    }
  },
  methods: {
    validate() {
      if(!this.isValid) {
        return
      }

      this.$emit('validate')
    }
  }
};
</script>
