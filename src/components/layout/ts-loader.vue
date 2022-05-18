<template>
    <div class="flex justify-center space-x-3 my-20">
      <icon-spinner class="text-blue-500"/>
      <span><slot>Loading</slot></span>
    </div>
</template>

<script>
import IconSpinner from '~/components/icons/icon-spinner.vue'

export default {
  name: 'ts-loader',
  components: {
    IconSpinner
  }
}
</script>