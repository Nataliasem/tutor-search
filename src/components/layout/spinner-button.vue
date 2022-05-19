<template>
  <button
    :type="type"
    :class="{ 'pointer-events-none': saving }"
    @click="click"
  >
    <icon-spinner v-if="saving" class="absolute" />

    <span class="block" :class="{ invisible: saving }">
      <slot />
    </span>
  </button>
</template>

<script>
import IconSpinner from '~/components/icons/icon-spinner.vue'

export default {
  name: 'spinner-button',
  components: {
    IconSpinner
  },
  props: {
    type: {
      type: String,
      default: 'button'
    },

    saving: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    click() {
      if (this.saving) {
        return
      }

      this.$emit('click')
    }
  }
}
</script>
