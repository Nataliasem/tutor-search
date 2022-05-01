<template>
  <div class="mx-auto max-w-card pt-8"><registration-form @register="register"/></div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'tutor-registration',
  components: {
    RegistrationForm: defineAsyncComponent(() =>
      import('~/components/tutors/registration-form.vue')
    )
  },
  methods: {
    register(tutor) {
      this.$store.commit('tutors/addTutor', tutor)

      this.$router.push('/tutors')
    }
  }
};
</script>
