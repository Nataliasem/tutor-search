<template>
  <teleport to="body">
    <Transition name="slide-fade">
      <div v-if="show" class="ts-alert" :class="classByType">
        <span>
          {{ message.text }}
        </span>
        <span class="text-gray-600 cursor-pointer" @click="close">
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
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  data: () => ({
    timerId: null
  }),
  computed: {
    classByType() {
      return `ts-alert-${this.message.type || 'success'}`
    }
  },
  watch: {
    show: {
      immediate: true,
      handler() {
        if (this.show) {
          this.timerId = setTimeout(this.close, 3000)
        }
      }
    }
  },
  methods: {
    close() {
      this.timerId = null
      this.$emit('close')
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