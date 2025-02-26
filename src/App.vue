<script setup lang="ts">
import { RouterView } from 'vue-router';
import MyHeader from '@/components/MyHeader.vue';
import { Toast } from 'primevue';
</script>

<template>
  <Toast />
  <MyHeader />
  <main id="main-layout">
    <RouterView />
  </main>
</template>

<style scoped>
main#main-layout {
  padding: 30px 180px;
  min-height: 100%;
}
</style>
