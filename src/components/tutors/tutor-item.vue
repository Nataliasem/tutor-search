<template>
  <li>
    <!-- FULL NAME-->
    <h3>{{ fullName }}</h3>

    <!-- HOURLY RATE-->
    <h4>{{ hourlyRate }}</h4>

    <!-- ACTIONS-->
<!--    <div>-->
<!--      <span v-for="area in areas" :key="area">{{ area }}</span>-->
<!--    </div>-->

    <!-- ACTIONS-->
    <div class="actions">
      <router-link :to="tutorContactLink">Contact</router-link>
      <router-link :to="tutorDetailsLink">View details</router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: 'tutor-item',
  props: {
    tutor: {
      type: Object,
      request: true
    }
  },
  computed: {
    fullName() {
      const firstName = this.tutor.firstName || ''
      const lastName = this.tutor.lastName || ''

      return `${firstName} ${lastName}`
    },

    hourlyRate() {
      const rate = this.tutor.hourlyRate || ''

      return '$' + rate + '/hour'
    },

    tutorDetailsLink() {
      const path = this.$route.path
      const id = this.tutor.id || ''

      return `${path}/${id}`
    },

    tutorContactLink() {
      return `${this.tutorDetailsLink}/contact`
    },

  }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>