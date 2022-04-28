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
        <ts-base-button to='/tutors/t1/contact' mode="link">Contact</ts-base-button>
      </div>

      <div>
        <div v-for="area in formattedAreas" :key="area" class="base-badge" :class="area">{{ (area || []).toUpperCase() }}</div>
        <p>{{ tutor.description }}</p>
      </div>
    </template>
  </div>
</template>

<script>
import TsBaseButton from '~/components/ui/ts-base-button.vue'

const AREAS_NAMES = {
  1: 'frontend',
  2: 'backend',
  3: 'career'
}

export default {
  name: 'tutor-details',
  components: { TsBaseButton },
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
    },

    formattedAreas() {
      return (this.tutor || []).areas.map(item => AREAS_NAMES[item])
    }
  },

}
</script>
