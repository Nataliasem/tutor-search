<template>
  <div class="page-wrapper space-y-6">
    <!-- ALERT -->
    <ts-alert :show="showAlert" :message="message" @close="clearMessage" />

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
    message: {
      text: '',
      type: ''
    }
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

    showAlert() {
      return Boolean(this.message.text)
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
          this.message.text = message || 'Failed to fetch'
          this.message.type = 'error'
        })
        .finally(() => (this.loading = false))
    },

    clearMessage() {
      this.message.text = ''
      this.message.type = ''
    }
  }
}
</script>
