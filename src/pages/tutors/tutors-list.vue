<template>
  <div class="max-w-card mx-auto mt-8">
    <!-- ALERT -->
    <ts-alert v-if="error" @close="clearError">{{ error }}</ts-alert>

    <!-- LOADING -->
    <ts-loader v-if="loading" >Loading tutors</ts-loader>

    <!-- NO TUTORS MESSAGE -->
    <div v-else-if="hasTutors === false">No tutors found</div>

    <!-- LIST OF TUTORS -->
    <div v-else class="space-y-6">
      <!-- FILTERS -->
      <ts-field-checklist v-model:checked="checkedAreas" :options="areasOptions" />

      <!-- TUTORS -->
      <tutor-item v-for="tutor in filteredTutors" :key="tutor.id" :tutor="tutor"/>
   </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { AREAS_OPTIONS } from '~/constants.js';
import tutorApi from '~/api/tutors';

export default {
  name: 'tutors-list',
  components: {
    TutorItem: defineAsyncComponent(() =>
      import('~/components/tutors/tutor-item.vue')
    ),
    TsFieldChecklist: defineAsyncComponent(() =>
      import('~/components/fields/ts-field-checklist.vue')
    ),
    TsLoader: defineAsyncComponent(() =>
      import('~/components/layout/ts-loader.vue')
    ),
    TsAlert: defineAsyncComponent(() =>
      import('~/components/layout/ts-alert.vue')
    )
  },
  data: () => ({
    loading: true,
    tutors: [],
    checkedAreas: [],
    areasOptions: AREAS_OPTIONS,
    error: ''
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
      this.loading = true

      tutorApi.loadTutors()
        .then(tutors => this.tutors = tutors)
        .catch(response => {
          this.error = new Error(response.message || 'Failed to fetch')
        })
        .finally(() => (this.loading = false))
    },

    clearError() {
      this.error = ''
    }
  }
}
</script>
