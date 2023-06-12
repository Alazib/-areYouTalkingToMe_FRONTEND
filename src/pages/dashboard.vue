<template>
  <q-page class="bg-grey-3 flex flex-col"></q-page>
</template>

<script setup>
// import { connectWithPeerJs } from 'src/services/peerJs';
// import { useAuthStore } from 'src/stores/auth';

useTitle('Are U Talking 2 Me?');

// const authStore = useAuthStore();

onMounted(() => {
  // connectWithPeerJs(authStore.user._id);
}); // Llevármelo a un nivel superior para cada vez que refresque se me conecte a PeerJS(desde cualquier punto de la app).
</script>
<route lang="yaml">
meta:
  authRequired: true
</route>
