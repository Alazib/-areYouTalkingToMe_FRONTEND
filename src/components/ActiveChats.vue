<template>
  <div>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Chats activos</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="contact in contacts"
        :key="contact.id"
        class="q-my-sm"
        clickable
        v-ripple
        @click="() => openChat(contact.id)"
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>

      <q-separator />
      <q-item-label header>Offline</q-item-label>

      <q-item
        v-for="contact in offline"
        :key="contact.id"
        class="q-mb-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="grey" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
const router = useRouter();

const contacts = [
  {
    id: '64202787a6fdd0375fedd1ab',
    name: 'Ulises',
    email: 'ulises@gmail.com',
    avatar: 'avatar4.jpg',
  },
  {
    id: '6442bfc2b1ea41306eaf8a9c',
    name: 'J.Alberto',
    email: 'alazib7@gmail.com',
    avatar: 'avatar1.jpg',
  },
  {
    id: 2,
    name: 'Mallorie Alessandrini',
    email: 'malessandrini1@marketwatch.com',
    avatar: 'avatar3.jpg',
  },
  {
    id: 3,
    name: 'Elisabetta Wicklen',
    email: 'ewicklen2@microsoft.com',
    avatar: 'avatar5.jpg',
  },
];

const offline = [
  {
    id: 5,
    name: 'Brunhilde Panswick',
    email: 'bpanswick4@csmonitor.com',
    avatar: 'avatar2.jpg',
  },
  {
    id: 6,
    name: 'Winfield Stapforth',
    email: 'wstapforth5@pcworld.com',
    avatar: 'avatar6.jpg',
  },
];

async function openChat(guestId) {
  router.replace(`/chat/${guestId}`);
}
</script>
