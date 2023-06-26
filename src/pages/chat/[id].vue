<template>
  <q-page>
    <div class="chat">
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
      <div flex>
        <q-icon
          name="mood"
          color="primary"
          size="30px"
          mt-15px
          mr-15px
        ></q-icon>
        <q-input
          class="chat-input"
          v-model="message"
          placeholder="Escribe un mensaje..."
        ></q-input>
        <q-btn type="submit" text-color="primary" rd-20px ml-15px>Enviar</q-btn>
      </div>
    </form>
  </q-page>
</template>

<script setup>
import { timeago } from 'src/util/timeago';
import { getChatLog, updateChatLog } from 'src/services/apiRoomsRequests';
import { connectRemotePeer, sendToRemote } from 'src/services/peerJs';
import { accessToChatRoom } from 'src/services/apiRoomsRequests';
import users from 'src/services/users';
import { useAuthStore } from 'src/stores/auth';
import { useMessageLogStore } from 'src/stores/messageLog';

const route = useRoute();
const remoteId = route.params.id;

const authStore = useAuthStore();
const messageLogStore = useMessageLogStore();

const message = ref('');
const conversation = ref([]);
const id_room = ref('');

onMounted(async () => {
  setTimeout(async () => {
    connectRemotePeer(remoteId);

    const chatRoomData = {
      password: 'contraseña',
      id_guest: remoteId,
      participants: [authStore.user._id, remoteId],
    };
    const { _id } = await accessToChatRoom(chatRoomData);

    const chatLog = await getChatLog(_id);

    conversation.value.push(...chatLog);

    id_room.value = _id;
  }, 500);
});

function send() {
  const messageLog = {
    from: authStore.user._id,
    to: remoteId,
    message: [message.value],
    date: new Date(),
  };
  message.value = '';

  updateChatLog(messageLog, id_room.value);

  conversation.value.push(messageLog);

  sendToRemote(remoteId, messageLog);
}

function updatedAtTimeAgo(date) {
  const formattedTimeAgo = date ? timeago(date) : null;
  return formattedTimeAgo.charAt(0).toUpperCase() + formattedTimeAgo?.slice(1);
}

watch(messageLogStore, () => {
  const messageLog = messageLogStore.getMessageLog;
  conversation.value.push(messageLog);
});
</script>

<sytle scoped lang="scss">
.chat {
  max-height: 70vh;
  overflow-y: scroll;
}
.chat-input {
  flex-grow: 2;
  border-radius: 20px;
}
</sytle>
<route lang="yaml">
meta:
  authRequired: true
</route>
