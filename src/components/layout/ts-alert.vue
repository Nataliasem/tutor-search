<template>
  <teleport to="body">
    <div class="ts-alert fade-in" :class="classByType">
      <span>
        {{ message }}
      </span>
      <span class="text-gray-600 cursor-pointer" @click="hide">
        <icon-cross />
      </span>
    </div>
  </teleport>
</template>

<script>
import IconCross from '~/components/icons/icon-cross.vue'

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
      default: 'error'
    }
  },
  emits: ['hide'],
  data: () => ({
    timerId: null
  }),
  computed: {
    classByType() {
      return `ts-alert-${this.type}`
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
}
</script>

<style>
.fade-in {
  animation: fadeIn ease 0.5s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

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
