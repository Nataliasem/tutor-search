<template>
  <div class="mx-auto max-w-card pt-8">
    <ts-form @register="register"/>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'tutor-registration',
  components: {
    TsForm: defineAsyncComponent(() =>
      import('~/components/fields/ts-form.vue')
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
