<template>
  <teleport to="body">
    <Transition name="slide-fade">
      <div class="ts-alert">
        <span><slot/></span>
        <span @click="close"><icon-cross class="text-amber-600" /></span>
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
  emits: ['close'],
  methods: {
    close() {
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

.slide-fade-enter-active {
  transition: all 6s ease-out;
}

.slide-fade-leave-active {
  transition: all 10s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>