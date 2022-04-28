<template>
  <header class="border-b border-slate-300 py-5 px-8">
    <nav class="flex justify-between items-center">
      <h1><router-link to="/">Find a tutor</router-link></h1>
      <div class="flex items-center space-x-3">
        <router-link to="/tutors">All tutors</router-link>
        <span class="h-5 w-px bg-slate-300 mx-5" />
        <router-link to="/requests">All requests</router-link>
      </div>
      <router-link to='/register' class="ts-button-main">Register as a tutor</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'app-header'
};
</script>
