<template>
  <router-view />
</template>

<script setup>
import '@unocss/reset/tailwind.css';
import 'uno.css';
import { connectWithPeerJs, createNewPeer } from 'src/services/peerJs';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

onMounted(() => {
  createNewPeer();
  connectWithPeerJs(authStore.user._id);
});
</script>
