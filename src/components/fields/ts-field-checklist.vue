<template>
  <div class="ts-field-checklist space-x-2">
    <label v-for="option in options" :key="option.value">
      <input
        type="checkbox"
        :id="option.value"
        :name="option.name"
        :value="option.value"
        :checked="isChecked(option.value)"
        @change="updateChecked(option.value)"
      />
      {{ option.name }}
    </label>
  </div>
</template>

<script>
import clonedeep from 'lodash.clonedeep'

export default {
  name: 'ts-field-checklist',
  props: {
    /**
     * @type {Array<String>}
     */
    checked: {
      type: Array,
      required: true
    },

    /**
     * @type {Array<Object>}
     */
    options: {
      type: Array,
      required: true
    }
  },
  emits: ['update:checked'],
  methods: {
    isChecked(option) {
      return (this.checked || []).includes(option)
    },

    updateChecked(option) {
      let updatedChecked = clonedeep(this.checked)

      this.isChecked(option)
        ? (updatedChecked = this.checked.filter((item) => item !== option))
        : updatedChecked.push(option)

      this.$emit('update:checked', updatedChecked)
    }
  }
}
</script>
