<template>
  <div class="max-w-card mx-auto mt-8">
    <!-- NO TUTORS MESSAGE -->
    <div v-if="hasTutors === false">No tutors found</div>

    <!-- LIST OF TUTORS -->
    <div class="space-y-6">
      <!-- FILTERS -->
      <ts-field-checklist v-model:checked="checkedAreas" :options="allAreas" />

      <!-- TUTORS -->
      <tutor-item v-for="tutor in filteredTutors" :key="tutor.id" :tutor="tutor"/>
   </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { reactive, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
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
  setup() {
    const store = useStore()
    const hasTutors = computed(() => {
      return store.getters['tutors/hasTutors'] || []
    })

    const areas = reactive({
      checkedAreas: [],
      allAreas: AREAS_OPTIONS
    })

    const filteredTutors = computed(() => {
      const tutors = store.getters['tutors/tutors'] || []

      if(areas.checkedAreas.length === 0) {
        return tutors
      }

      return tutors.filter(item => item.areas.some(area => areas.checkedAreas.includes(area)))
    })

    return { ...toRefs(areas), hasTutors, filteredTutors }
  }
}
</script>
