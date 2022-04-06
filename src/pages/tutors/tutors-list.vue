<template>
  <!-- PAGE TITLE -->
  <div>Tutors</div>

  <!-- FILTER -->
  <section>Filter</section>

  <div class="base-card">
    <!-- ACTIONS -->
    <div class='controls'>
      <base-button class="outline">Refresh</base-button>
      <base-button to='/register' mode="link">Register as a coach</base-button>
    </div>

    <!-- NO TUTORS MESSAGE -->
    <div v-if="hasTutors === false">No tutors found</div>

    <!-- LIST OF TUTORS-->
    <ul v-else>
      <tutor-item v-for="tutor in filteredTutors" :key="tutor.id" :tutor="tutor"/>
    </ul>
  </div>
</template>

<script>
import TutorItem from '../../components/tutors/tutor-item.vue'
import BaseButton from '../../components/ui/base-button.vue'

export default {
  name: 'tutors-list',
  components: {
    TutorItem,
    BaseButton
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

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
