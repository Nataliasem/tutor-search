<template>
    <div class="max-w-card mx-auto mt-8">
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

export default {
  name: 'tutors-list',
  components: {
    TutorItem
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
