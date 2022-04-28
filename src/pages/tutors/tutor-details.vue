<template>
  <div class="max-w-card mx-auto mt-8">
    <div v-if="!tutor">No tutor info</div>

    <template v-else>
      <div>
        <h2>{{ tutorNameView }}</h2>
        <h3>{{ tutorRateView }}</h3>
      </div>

      <div>
        <h2>Interested? Reach out now!</h2>
        <router-link to='/tutors/t1/contact'>Contact</router-link>
      </div>

      <div>
        <div v-for="area in tutor.areas" :key="area" class="ts-badge" :class="area">{{ area }}</div>
        <p>{{ tutor.description }}</p>
      </div>
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
