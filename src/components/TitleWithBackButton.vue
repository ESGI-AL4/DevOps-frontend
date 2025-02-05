<script setup lang="ts">
const props = defineProps<{
  title: string;
  backButtonCallback?: () => void;
}>();
</script>

<template>
  <div id="title-with-back-button">
    <PrimeButton
      data-cy-role="back"
      icon="pi pi-arrow-left"
      variant="text"
      rounded
      aria-label="Filter"
      v-if="backButtonCallback"
      @click="backButtonCallback"
    />
    <h1>{{ props.title }}</h1>
  </div>
</template>

<style scoped>
#title-with-back-button {
  display: flex;
  gap: 25px;
}
</style>
