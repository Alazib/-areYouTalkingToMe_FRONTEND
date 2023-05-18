<template>
  <q-page> <div>PLATANO</div></q-page>
</template>

<script setup lang="ts">
const route = useRoute();

console.log(route.meta);
</script>

<route lang="yaml">
meta:
  layout: auth
</route>
