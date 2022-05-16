<template>
  <div class="page-wrapper">
    <!-- ALERT -->
    <ts-alert :show="Boolean(error)" @close="clearError">{{ error }}</ts-alert>

    <!-- LOADING -->
    <ts-loader v-if="loading" >Loading requests</ts-loader>

    <!-- NO REQUESTS MESSAGE -->
    <div v-else-if="hasRequests === false">No requests found</div>

    <!-- LIST OF REQUESTS -->
    <div class="space-y-6">
      <!-- REQUESTS -->
      <div class="ts-card px-6 space-y-4" v-for="request in requests" :key="request.id">
        <div class="font-bold">{{ request.email }}</div>
        <div>{{ request.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import requestsApi from '~/api/requests'
import TsAlert from '~/components/layout/ts-alert.vue'
import clonedeep from 'lodash.clonedeep';

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
    cashedRequests() {
      return this.$store.state.requests || []
    },

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

      const shouldReload = this.shouldReload()
      if(shouldReload === false && this.cashedRequests.length > 0) {
        this.requests = clonedeep(this.cashedRequests)
        this.loading = false
        return
      }

      requestsApi.loadRequests()
        .then(requests => (this.requests = requests))
        .then(() => this.$store.commit('SET_REQUESTS', this.requests))
        .then(() => this.$store.commit('SET_LAST_FETCH_REQUESTS_TIMESTAMP'))
        .catch( ({ message }) => {
          this.error = message || 'Failed to fetch'
        })
        .finally(() => (this.loading = false))
    },

    shouldReload() {
      const lastTimestamp = this.$store.state.lastFetchRequestsTimestamp
      if(!lastTimestamp) {
        return true
      }

      const currentTimestamp = new Date().getTime()
      return (currentTimestamp - lastTimestamp) / 1000 > 180
    },

    clearError() {
      this.error = ''
    }
  }
}
</script>
