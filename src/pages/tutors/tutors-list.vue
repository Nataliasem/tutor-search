<script>
import { defineAsyncComponent, onMounted } from 'vue';
import { AREAS_OPTIONS } from '~/constants'
import tutorApi from '~/api/tutors'
import TsAlert from '~/components/layout/ts-alert.vue'
import clonedeep from 'lodash.clonedeep'
import { ref, reactive, computed } from 'vue'
import { useStore }  from 'vuex'

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
  setup() {
    const store = useStore()

    const loading = ref(false)

    const message = reactive({
      text: '',
      type: ''
    })

    const checkedAreas = ref([])
    const allAreas = ref(AREAS_OPTIONS)

    const tutors = ref([])

    onMounted(() => loadTutors())

    const cashedTutors = computed(() => {
      return store.state.tutors || []
    })

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

    const shouldReloadTutors = computed(() => {
      const lastTimestamp = store.state.lastFetchTutorsTimestamp
      if(!lastTimestamp) {
        return true
      }

      const currentTimestamp = new Date().getTime()
      return (currentTimestamp - lastTimestamp) / 1000 > 180
    })

    function loadTutors() {
      loading.value = true

      if(shouldReloadTutors.value === false && cashedTutors.value.length > 0) {
        tutors.value = clonedeep(cashedTutors.value)
        loading.value = false
        return
      }

      tutorApi.loadTutors()
        .then(response => (tutors.value = response))
        .then(() => store.commit('SET_TUTORS', tutors))
        .then(() => store.commit('SET_LAST_FETCH_TUTORS_TIMESTAMP'))
        .catch( ({ message }) => {
          message.text = message || 'Failed to fetch'
          message.type = 'error'
        })
        .finally(() => (loading.value = false))
    }

    // ALERTS COMPOSITION
    const showAlert = computed(() => {
      return Boolean(message.text)
    })

    function clearMessage() {
      message.text = ''
      message.type = ''
    }

    return {
      loading,
      showAlert,
      message,
      clearMessage,
      hasTutors,
      checkedAreas,
      allAreas,
      hasFilteredTutors,
      filteredTutors
    }
  }
}
</script>

<template>
  <div class="page-wrapper">
    <!-- ALERT -->
    <ts-alert :show="showAlert" :message="message" @close="clearMessage" />

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
