<template>
  <div class="page-wrapper">
    <!-- ALERT -->
    <ts-alert v-if="isShown" :message="message" :type="type" @hide="hideAlert" />

    <!-- LOADING -->
    <ts-loader v-if="loading" >Loading tutors</ts-loader>

    <!-- NO TUTORS MESSAGE -->
    <div v-else-if="hasTutors === false">No tutors found</div>

    <!-- LIST OF TUTORS -->
    <div v-else class="space-y-6">
      <!-- FILTERS -->
      <ts-field-checklist v-model:checked="checkedAreas" :options="allAreas" />

      <!-- NO FILTERED TUTORS MESSAGE -->
      <div v-if="hasFilteredTutors === false">No tutors found. Try to change the filters</div>

      <!-- TUTORS -->
      <tutor-item v-for="tutor in filteredTutors" :key="tutor.id" :tutor="tutor"/>
   </div>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, computed, onMounted } from 'vue'
import { useStore }  from 'vuex'
import { AREAS_OPTIONS } from '~/constants'
import tutorApi from '~/api/tutors'
import clonedeep from 'lodash.clonedeep'
import alert from '~/compositions/alert'

export default {
  name: 'tutors-list',
  components: {
    TsAlert: defineAsyncComponent(() =>
      import('~/components/layout/ts-alert.vue')
    ),
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
  setup() {
    const store = useStore()

    const hasTimestampExpired = computed(() => {
      const lastTimestamp = store.state.lastFetchTutorsTimestamp
      if(!lastTimestamp) {
        return true
      }

      const currentTimestamp = new Date().getTime()
      return (currentTimestamp - lastTimestamp) / 1000 > 180
    })

    const cashedTutors = computed(() => {
      return store.state.tutors || []
    })

    // LOAD TUTORS
    const loading = ref(false)
    const tutors = ref([])
    const { isShown, message, type, showAlert, hideAlert } = alert()

    onMounted(() => loadTutors())

    const loadTutors = () => {
      loading.value = true

      if(hasTimestampExpired.value === false && cashedTutors.value.length > 0) {
        tutors.value = clonedeep(cashedTutors.value)
        loading.value = false
        return
      }

      tutorApi.loadTutors()
        .then(response => (tutors.value = response))
        .then(() => store.commit('SET_TUTORS', tutors))
        .then(() => store.commit('SET_LAST_FETCH_TUTORS_TIMESTAMP'))
        .catch( ({ message }) => {
          showAlert(message || 'Failed to fetch')
        })
        .finally(() => (loading.value = false))
    }

    // GET FILTERED TUTORS
    const checkedAreas = ref([])
    const allAreas = ref(AREAS_OPTIONS)

    const filteredTutors = computed(() => {
      if(checkedAreas.value.length === 0) {
        return tutors.value
      }

      return tutors.value.filter(item => item.areas.some(area => checkedAreas.value.includes(area)))
    })

    const hasTutors = computed(() => {
      return (tutors.value || []).length > 0
    })

    const hasFilteredTutors = computed(() => {
      return (filteredTutors.value || []).length > 0
    })

    return {
      loading,
      checkedAreas,
      allAreas,
      filteredTutors,
      hasFilteredTutors,
      hasTutors,

      // alert
      isShown,
      message,
      type,
      hideAlert
    }
  }
}
</script>
