<template>
  <div class="max-w-card mx-auto mt-8 space-y-6">
    <div v-if="!tutor">No tutor info</div>

    <template v-else>
      <div>
        <div class="text-size-16 font-bold">{{ tutorNameView }}</div>
        <div>{{ tutorRateView }}</div>
      </div>

      <p>{{ tutor.description }}</p>

      <router-link class="ts-button-main" :to='tutorContactsLink'>Interested? Reach out now!</router-link>
    </template>
  </div>
</template>

<script>
import tutorApi from '~/api/tutors'

export default {
  name: 'tutor-details',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    tutor: null
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
      tutorApi.loadTutor(this.id)
        .then(tutor => (this.tutor = tutor))
        .catch(() => console.log('error load a tutor'))
    }
  }
}
</script>
