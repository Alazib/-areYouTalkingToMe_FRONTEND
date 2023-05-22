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

const route = useRoute();
const message = ref('');
const conversation = ref([]);
const id_room = route.params.id;

onMounted(async () => {
  connectRemotePeer(users.remoteUser.id);

  const chatLog = await getChatLog(id_room);

  conversation.value.push(...chatLog);
});

function send() {
  const messageLog = {
    from: users.localUser.id,
    to: users.remoteUser.id,
    message: [message.value],
    date: new Date(),
  };
  message.value = '';
  updateChatLog(messageLog, id_room);
  conversation.value.push(messageLog);

  sendToRemote(users.remoteUser.id, messageLog);
}

function updatedAtTimeAgo(date) {
  const formattedTimeAgo = date ? timeago(date) : null;

  return formattedTimeAgo.charAt(0).toUpperCase() + formattedTimeAgo?.slice(1);
}
</script>
