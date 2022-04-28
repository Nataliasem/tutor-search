<template>
  <!-- FILTER -->
  <div class="max-w-card mx-auto mt-8">




  <!-- ACTIONS -->
  <div class="flex justify-between mb-6">
    <tutor-filters v-model:checked="checkedAreas" :filter-options="areasOptions" />
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
import TutorFilters from '../../components/tutors/tutor-filters.vue'

const AREAS_OPTIONS =
  [
    {
      value: 1,
      name: 'Frontend'
    },
    {
      value: 2,
      name: 'Backend'
    },
    {
      value: 3,
      name: 'Career'
    },
  ]


export default {
  name: 'tutors-list',
  components: {
    TutorItem,
    TsBaseButton,
    TutorFilters
  },
  data: () => ({
    checkedAreas: [],
    areasOptions: AREAS_OPTIONS
  }),
  computed: {
    filteredTutors() {
      const tutors = this.$store.getters['tutors/tutors'] || []

      if(this.checkedAreas.length === 0) {
        return tutors
      }

      return tutors.filter(item => item.areas.some(area => this.checkedAreas.includes(area)))
    },
    hasTutors() {
      return this.$store.getters['tutors/hasTutors'] || []
    }
  }
}
</script>
