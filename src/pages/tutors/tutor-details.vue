<template>
  <div class="page-wrapper space-y-6">
    <!-- ALERT -->
    <ts-alert :show="Boolean(error)" @close="clearError">{{ error }}</ts-alert>

    <!-- LOADING -->
    <ts-loader v-if="loading" >Loading requests</ts-loader>

    <!-- NO TUTOR INFO -->
    <div v-else-if="!tutor">No tutor info</div>

    <template v-else>
      <!-- NAME + RATE -->
      <div>
        <div class="text-size-16 font-bold">{{ tutorNameView }}</div>
        <div>{{ tutorRateView }}</div>
      </div>

      <!-- DESCRIPTION -->
      <p>{{ tutor.description }}</p>

      <!-- CONTACT LINK -->
      <router-link class="ts-button-main" :to='tutorContactsLink'>Interested? Reach out now!</router-link>
    </template>
  </div>
</template>

<script>
import tutorApi from '~/api/tutors'
import TsAlert from '~/components/layout/ts-alert.vue'
import { defineAsyncComponent } from 'vue';

export default {
  name: 'tutor-details',
  components: {
    TsAlert,
    TsLoader: defineAsyncComponent(() =>
      import('~/components/layout/ts-loader.vue')
    )
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: true,
    tutor: null,
    error: ''
  }),
  computed: {
    tutorNameView() {
      const firstName = this.tutor.firstName || ''
      const lastName = this.tutor.lastName || ''
      return firstName && lastName ? `${firstName} ${lastName}` : '-'
    },

    tutorRateView() {
      const rate = this.tutor.hourlyRate || ''
      return rate ? `${rate}$/hour` : '-'
    },

    tutorContactsLink() {
      return `${this.$route.path}/contact`
    }
  },
  mounted() {
    this.loadTutor()
  },
  methods:{
    loadTutor() {
      this.loading = true

      tutorApi.loadTutor(this.id)
        .then(tutor => (this.tutor = tutor))
        .catch( ({ message }) => {
          this.error = message || 'Failed to fetch'
        })
        .finally(() => (this.loading = false))
    },

    clearError() {
      this.error = ''
    }
  }
}
</script>
