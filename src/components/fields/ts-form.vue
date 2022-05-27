<template>
  <div class="ts-card px-6">
    <form @submit.prevent="validate">
      <div class="flex flex-col space-y-8">
        <slot />
      </div>

      <slot name="action-buttons" v-bind="{ disabled: disabled }" />
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
    }
  },
  emits: ['validate'],
  computed: {
    isValid() {
      const validatedFields = Object.values(this.formSchema)

      return validatedFields.every(item => item.valid && item.touched)
    },

    disabled() {
      return this.isValid === false
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
}
</script>
