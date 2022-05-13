<template>
  <div class="page-wrapper">
    <!-- ALERT -->
    <ts-alert :show="Boolean(error)" @close="clearError">{{ error }}</ts-alert>

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
import { defineAsyncComponent } from 'vue'
import { AREAS_OPTIONS } from '~/constants'
import tutorApi from '~/api/tutors'
import TsAlert from '~/components/layout/ts-alert.vue'
import clonedeep from 'lodash.clonedeep'

export default {
  name: 'tutors-list',
  components: {
    TsAlert,
    TutorItem: defineAsyncComponent(() =>
      import('~/components/tutors/tutor-item.vue')
    ),
    TsFieldChecklist: defineAsyncComponent(() =>
      import('~/components/fields/ts-field-checklist.vue')
    ),
    TsLoader: defineAsyncComponent(() =>
      import('~/components/layout/ts-loader.vue')
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
    cashedTutors() {
      return this.$store.state.tutors || []
    },

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

      const shouldReload = this.shouldReload()
      if(shouldReload === false && this.cashedTutors.length > 0) {
        this.tutors = clonedeep(this.cashedTutors)
        this.loading = false
        return
      }

      tutorApi.loadTutors()
        .then(tutors => this.tutors = tutors)
        .then(() => this.$store.commit('SET_TUTORS', this.tutors))
        .then(() => this.$store.commit('SET_LAST_FETCH_TUTORS_TIMESTAMP'))
        .catch(response => {
          this.error = new Error(response.message || 'Failed to fetch')
        })
        .finally(() => (this.loading = false))
    },

    shouldReload() {
      const lastTimestamp = this.$store.state.lastFetchTutorsTimestamp
      if(!lastTimestamp) {
        return true
      }

      const currentTimestamp = new Date().getTime()
      return (currentTimestamp - lastTimestamp) / 1000 > 180
    },

    clearError() {
      this.error = ''
    }
  }
}
</script>
