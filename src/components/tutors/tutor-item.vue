<template>
  <li class="tutor-item">
    <!-- FULL NAME -->
    <div class="name">{{ fullName }}</div>

    <!-- HOURLY RATE -->
    <div class="rate">{{ hourlyRate }}</div>

    <!-- AREAS -->
    <div v-for="area in formattedAreas" :key="area" class="base-badge" :class="area">{{ (area || []).toUpperCase() }}</div>

    <!-- ACTIONS -->
    <div class="actions">
      <base-button class="outline" mode="link" :to="tutorContactLink">Contact</base-button>
      <base-button mode="link" :to="tutorDetailsLink">View details</base-button>
    </div>
  </li>
</template>

<script>
import BaseButton from '../../components/ui/base-button.vue'

const AREAS_NAMES = {
  1: 'frontend',
  2: 'backend',
  3: 'career'
}

export default {
  name: 'tutor-item',
  components: {
    BaseButton
  },
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

    formattedAreas() {
      return (this.tutor || []).areas.map(item => AREAS_NAMES[item])
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

<style>
.tutor-item {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

.tutor-item .name {
  font-size: 1.5rem;
}

.tutor-item .name,
.tutor-item .rate {
  margin: 0.5rem 0;
}

.tutor-item .base-badge {
  margin: 0.5rem 0;
}

.tutor-item .actions {
  display: flex;
  justify-content: flex-end;
}
</style>