<template>
  <div class="max-w-card mx-auto mt-8">
    <!-- NO REQUESTS MESSAGE -->
    <div v-if="hasRequests === false">No requests found</div>

    <!-- LIST OF REQUESTS -->
    <div class="space-y-6">
      <!-- REQUESTS -->
      <div class="ts-card p-6 space-y-4" v-for="request in requests" :key="request.id">
        <div class="font-bold">{{ request.email }}</div>
        <div>{{ request.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'requests-list',
  computed: {
    requests() {
      return this.$store.getters['requests/requests'] || []
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests']
    }
  }
}
</script>
