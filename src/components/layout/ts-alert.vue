<template>
  <teleport to="body">
    <Transition name="slide-fade">
      <div class="ts-alert" :class="classByType">
        <span>
          {{ message }}
        </span>
        <span class="text-gray-600 cursor-pointer" @click="hide">
          <icon-cross />
        </span>
      </div>
    </Transition>
  </teleport>
</template>

<script>
import IconCross from '~/components/icons/icon-cross.vue';

export default {
  name: 'ts-alert',
  components: {
    IconCross
  },
  props: {
    message: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'success'
    }
  },
  emits: ['hide'],
  data: () => ({
    timerId: null
  }),
  computed: {
    classByType() {
      return `ts-alert-${this.type || 'success'}`
    }
  },
  mounted() {
    this.timerId = setTimeout(this.hide, 3000)
  },
  methods: {
    hide() {
      this.$emit('hide')
    }
  }
};
</script>

<style>
.ts-alert {
  @apply absolute top-4 right-4;
  @apply flex items-center space-x-6 p-4;
  @apply border;
}

.ts-alert-error {
  @apply border-amber-400 bg-amber-200;
}

.ts-alert-success {
  @apply border-green-400 bg-green-200;
}
</style>