<template>
  <q-page>
    <div class="chat b-1px grow">
      <div v-for="message in conversation" :key="message.date" flex flex-col>
        <q-chat-message
          v-if="message.from === users.localUser.id"
          :name="users.localUser.name"
          :avatar="users.localUser.avatar"
          :text="message.message"
          :stamp="updatedAtTimeAgo(message.date)"
          sent
        ></q-chat-message>
        <q-chat-message
          v-if="message.from === users.remoteUser.id"
          :name="users.remoteUser.name"
          :avatar="users.remoteUser.avatar"
          :text="message.message"
          :stamp="updatedAtTimeAgo(message.date)"
        ></q-chat-message>
      </div>
    </div>
    <form @submit.prevent="send()">
      <q-input v-model="message" placeholder="Send message..."></q-input>
      <q-btn type="submit" text-color="black">Send</q-btn>
    </form>
  </q-page>
</template>

<script setup>
import { timeago } from 'src/util/timeago';
import { getChatLog, updateChatLog } from 'src/services/apiRoomsRequests';
import { connectRemotePeer, sendToRemote } from 'src/services/peerJs';
import users from 'src/services/users';
import { useAuthStore } from 'src/stores/auth';

const route = useRoute();
const id_room = route.params.id;

const authStore = useAuthStore();

const message = ref('');
const conversation = ref([]);

const remoteId = sessionStorage.getItem('remote_user');

onMounted(async () => {
  connectRemotePeer(remoteId);

  const chatLog = await getChatLog(id_room);

  conversation.value.push(...chatLog);
});

function send() {
  const messageLog = {
    from: authStore.user._id,
    to: remoteId,
    message: [message.value],
    date: new Date(),
  };
  message.value = '';
  updateChatLog(messageLog, id_room);
  conversation.value.push(messageLog);

  sendToRemote(remoteId, messageLog);
}

function updatedAtTimeAgo(date) {
  const formattedTimeAgo = date ? timeago(date) : null;

  return formattedTimeAgo.charAt(0).toUpperCase() + formattedTimeAgo?.slice(1);
}
</script>
