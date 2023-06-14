<template>
  <q-layout view="hHh lpr fFf">
    <q-header reveal bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar flex justify-between>
        <div flex>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar1.jpg" />
            </q-avatar>
            Bienvenido, {{ authStore.user.name }}.
          </q-toolbar-title>
        </div>

        <div flex>
          <q-card-section class="flex gap-3">
            <q-btn
              label="Mi perfil"
              color="primary"
              icon="account_circle"
              to="/profile"
            />
            <q-btn
              label="Salir"
              color="negative"
              icon="logout"
              class="w-fit"
              @click="logout()"
            />
          </q-card-section>
          <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
        </div>
      </q-toolbar>

      <!-- <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs> -->
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <contacts />
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <active-chats />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-toolbar> </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import {
  connectWithPeerJs,
  createNewPeer,
  disconnectFromPeerJs,
} from 'src/services/peerJs';
import { useAuthStore } from 'src/stores/auth';

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  createNewPeer();
  connectWithPeerJs(authStore.user._id);
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

function logout() {
  authStore.logout();
  router.replace('/auth');
  disconnectFromPeerJs();
}
</script>
