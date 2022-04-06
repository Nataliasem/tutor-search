<template>
  <!-- PAGE TITLE -->
  <div>Tutors</div>

  <!-- FILTER -->
  <section>Filter</section>

  <!-- ACTIONS -->
  <div class='controls'>
    <button type='button'>Refresh</button>
    <router-link to='/register'>Register as a coach</router-link>
  </div>

  <!-- NO TUTORS MESSAGE -->
  <div v-if="hasTutors === false">No tutors found</div>

  <!-- LIST OF TUTORS-->
  <ul v-else>
    <tutor-item v-for="tutor in filteredTutors" :key="tutor.id" :tutor="tutor"/>
  </ul>
</template>

<script>
import tutorItem from '../../components/tutors/tutor-item.vue'

export default {
  name: 'tutors-list',
  components: {
    tutorItem
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
