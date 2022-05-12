<template>
    <div class="ts-card">
      <div class="px-6 pb-10">
        <div class="flex justify-between items-center">
          <!-- FULL NAME -->
          <div class="text-size-22">{{ fullName }}</div>

          <!-- ACTIONS -->
          <div class="flex items-center space-x-5 text-indigo-900">
            <router-link to="/contact" title="contact"><icon-phone /></router-link>
            <router-link :to="tutorDetailsLink" title="details"><icon-user /></router-link>
          </div>
        </div>

        <!-- HOURLY RATE -->
        <div>{{ hourlyRate }}</div>
      </div>

    <!-- AREAS -->
    <div class="ts-card-footer">
      <div v-for="area in formattedAreas" :key="area" class="ts-badge" :class="area">{{ area }}</div>
    </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const AREAS_NAMES = {
  1: 'frontend',
  2: 'backend',
  3: 'career'
}

export default {
  name: 'tutor-item',
  components: {
    IconUser: defineAsyncComponent(() =>
      import('~/components/icons/icon-user.vue')
    ),
    IconPhone: defineAsyncComponent(() =>
      import('~/components/icons/icon-phone.vue')
    )
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
    }
  }
}
</script>
