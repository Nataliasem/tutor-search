<template>
  <div class="max-w-card mx-auto mt-8">
    <!-- NO TUTORS MESSAGE -->
    <div v-if="hasTutors === false">No tutors found</div>

    <!-- LIST OF TUTORS -->
    <div class="space-y-6">
      <!-- FILTERS -->
      <ts-field-checklist v-model:checked="checkedAreas" :filter-options="areasOptions" />

      <!-- TUTORS -->
      <tutor-item v-for="tutor in filteredTutors" :key="tutor.id" :tutor="tutor"/>
   </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { AREAS_OPTIONS } from '~/constants.js'

export default {
  name: 'tutors-list',
  components: {
    TutorItem: defineAsyncComponent(() =>
      import('~/components/tutors/tutor-item.vue')
    ),
    TsFieldChecklist: defineAsyncComponent(() =>
      import('~/components/fields/ts-field-checklist.vue')
    )
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
