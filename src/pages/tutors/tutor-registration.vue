<template>
  <div class="mx-auto max-w-card pt-8"><registration-form /></div>
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
};
</script>
