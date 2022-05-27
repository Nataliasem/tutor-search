<template>
  <div class="page-wrapper space-y-6">
    <!-- ALERT -->
    <ts-alert v-if="isShown" :message="message" :type="type" @hide="hideAlert" />

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
import { defineAsyncComponent } from 'vue'
import alert from '~/compositions/alert'

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
  setup() {
    const { isShown, message, type, showAlert, hideAlert } = alert()

    return {
      isShown,
      message,
      type,
      showAlert,
      hideAlert
    }
  },
  data: () => ({
    loading: true,
    tutor: null,
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
          this.showAlert(message || 'Failed to fetch')
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>
