<template>
  <div class="ts-card p-8">
    <div class="text-center mb-8 text-size-16">Register as a tutor now</div>
    <form @submit.prevent="validate">
      <div class="flex flex-col space-y-8">
        <slot />
      </div>
      <button type="submit" class="ts-button-main mt-8">{{ submitText }}</button>
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
    }
  },
  emits: ['validate'],
  methods: {
    validate() {
      const rawFields = Object.values(this.formSchema)

      const validatedFields = rawFields.map(item => {
        if(item.required && !item.value) {
          item.valid = false
        }

        return item
      })

      const isValid = validatedFields.every(item => item.valid)
      if(!isValid) {
        return
      }

      this.$emit('validate')
    }
  }
};
</script>
