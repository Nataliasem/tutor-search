<template>
    <router-link class="ts-link" v-if="useLink" :to="to">
      <slot />
    </router-link>

    <button class="ts-main-button" type="button" v-else>
      <slot />
    </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    mode: {
      type: String,
      default: 'button'
    },
    to: {
      type: String,
      default: '/'
    }
  },
  computed: {
    useLink() {
      return this.mode === 'link'
    }
  }
};
</script>

<style>
.ts-link {
  @apply decoration-0 cursor-pointer inline-block outline-0;
}

.ts-link:hover,
.ts-link:active {

}

.ts-main-button {
  @apply outline-0;
}

.ts-main-button:hover,
.ts-main-button:active {

}
</style>