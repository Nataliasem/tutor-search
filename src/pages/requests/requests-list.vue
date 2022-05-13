<template>
  <div class="max-w-card mx-auto mt-8">
    <!-- ALERT -->
    <ts-alert :show="Boolean(error)" @close="clearError">{{ error }}</ts-alert>

    <!-- LOADING -->
    <ts-loader v-if="loading" >Loading requests</ts-loader>

    <!-- NO REQUESTS MESSAGE -->
    <div v-else-if="hasRequests === false">No requests found</div>

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
import { defineAsyncComponent } from 'vue'
import requestsApi from '~/api/requests.js'
import TsAlert from '~/components/layout/ts-alert.vue'

export default {
  name: 'requests-list',
  components: {
    TsAlert,
    TsLoader: defineAsyncComponent(() =>
      import('~/components/layout/ts-loader.vue')
    )
  },
  data: () => ({
    loading: true,
    requests: [],
    error: ''
  }),
  computed: {
    hasRequests() {
      return (this.requests || []).length > 0
    }
  },
  mounted() {
    this.loadRequests()
  },
  methods: {
    loadRequests() {
      this.loading = true

      requestsApi.loadRequests()
        .then(requests => (this.requests = requests))
        .catch(response => {
          this.error = new Error(response.message || 'Failed to fetch')
        })
        .finally(() => (this.loading = false))
    },

    clearError() {
      this.error = ''
    }
  }
}
</script>
