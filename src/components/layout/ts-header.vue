<template>
  <header class="border-b border-slate-300 py-5 px-8">
    <nav class="flex justify-between">
      <h1><router-link to="/">Find a tutor</router-link></h1>
      <div class="flex">
        <span><router-link to="/tutors">All tutors</router-link></span>
        <span class="h-full w-px bg-slate-300 mx-5" />
        <span><router-link to="/requests">All requests</router-link></span>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'app-header'
};
</script>
