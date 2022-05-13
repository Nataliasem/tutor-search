<template>
  <teleport to="body">
    <Transition name="slide-fade">
      <div v-if="show" class="ts-alert">
        <span>
          <slot />
        </span>
        <span class="text-amber-600 cursor-pointer" @click="close">
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
    }
  },
  emits: ['close'],
  data: () => ({
    timerId: null
  }),
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
  @apply flex items-center space-x-6;
  @apply p-4 border border-amber-400 bg-amber-200;
}
</style>