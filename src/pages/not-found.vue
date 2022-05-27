<template>
  <div class="page-wrapper">
    <div class="ts-card px-6">
      <div class="font-bold mb-3">Page not found</div>
      <div>This page could not be not found - may be check out all our
        <router-link to="/tutors" class="text-blue-500 hover:text-blue-800" >tutors.</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found'
}
</script>
