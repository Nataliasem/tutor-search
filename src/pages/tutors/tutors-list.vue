<template>
  <div class="max-w-card mx-auto mt-8">
    <!-- NO TUTORS MESSAGE -->
    <div v-if="hasTutors === false">No tutors found</div>

    <!-- LIST OF TUTORS -->
    <div class="space-y-6">
      <!-- FILTERS -->
      <ts-field-checklist v-model:checked="checkedAreas" :options="areasOptions" />

      <!-- TUTORS -->
      <tutor-item v-for="tutor in filteredTutors" :key="tutor.id" :tutor="tutor"/>
   </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { AREAS_OPTIONS } from '~/constants.js'
import tutorApi from '~/api/tutors'

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
    tutors: [],
    checkedAreas: [],
    areasOptions: AREAS_OPTIONS
  }),
  computed: {
    filteredTutors() {
      if(this.checkedAreas.length === 0) {
        return this.tutors
      }

      return this.tutors.filter(item => item.areas.some(area => this.checkedAreas.includes(area)))
    },
    hasTutors() {
      return (this.tutors || []).length > 0
    }
  },
  mounted() {
    this.loadTutors()
  },
  methods: {
    loadTutors() {
      tutorApi.loadTutors()
        .then(tutors => this.tutors = tutors)
        .catch(() => console.log('error with loading tutors'))
    }
  }
}
</script>
