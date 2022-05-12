<template>
    <div class="mx-auto flex space-x-3 w-1/4">
      <icon-spinner class="text-blue-500"/>
      <span><slot>Loading</slot></span>
    </div>
</template>

<script>
import IconSpinner from '~/components/icons/icon-spinner.vue';

export default {
  name: 'ts-loader',
  components: {
    IconSpinner
  }
}
</script>