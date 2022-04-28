<template>
    <div class="max-w-card mx-auto mt-8">
      <!-- ACTIONS -->
      <div class="flex justify-between mb-6">
        <ts-base-button class="outline">Refresh</ts-base-button>
        <ts-base-button to='/register' mode="link">Register as a coach</ts-base-button>
      </div>

      <!-- NO TUTORS MESSAGE -->
      <div v-if="hasTutors === false">No tutors found</div>

      <!-- LIST OF TUTORS -->
      <div class="space-y-6">
        <tutor-item v-for="tutor in filteredTutors" :key="tutor.id" :tutor="tutor"/>
      </div>
    </div>
</template>

<script>
import TutorItem from '../../components/tutors/tutor-item.vue'
import TsBaseButton from '../../components/ui/ts-base-button.vue'

export default {
  name: 'tutors-list',
  components: {
    TutorItem,
    TsBaseButton
  },
  computed: {
    filteredTutors() {
      return this.$store.getters['tutors/tutors'] || []
    },
    hasTutors() {
      return this.$store.getters['tutors/hasTutors'] || []
    }
  }
}
</script>
