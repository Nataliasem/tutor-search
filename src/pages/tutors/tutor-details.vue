<template>
  <div class="max-w-card mx-auto mt-8 space-y-6">
    <div v-if="!tutor">No tutor info</div>

    <template v-else>
      <div>
        <div class="text-size-16 font-bold">{{ tutorNameView }}</div>
        <div>{{ tutorRateView }}</div>
      </div>

      <p>{{ tutor.description }}</p>

      <router-link class="ts-button-main" to='/contact'>Interested? Reach out now!</router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'tutor-details',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    tutor() {
      const tutors = this.$store.getters['tutors/tutors'] || []
      return tutors.find(item => item.id === this.id) || null
    },

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

}
</script>
