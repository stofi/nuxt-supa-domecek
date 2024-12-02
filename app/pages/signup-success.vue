<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Signup Success'
})
</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <div class="text-center">
      <h1 class="text-2xl font-bold">Signup Success</h1>
      <p>You have successfully signed up for an account.</p>
      <p>Please check your email for a verification link.</p>
    </div>
  </UCard>
</template>
