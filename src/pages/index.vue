<template>
  <q-page class="bg-grey-3 flex flex-col">
    <div class="test window flex grow">
      <div b-2px b-black text-black grow flex-col>
        <q-btn text-color="black" @click="openChat()"
          >Chat with {{ users.remoteUser.name }}</q-btn
        >
        <q-input v-model="message" placeholder="Send message..."></q-input>
        <q-btn text-color="black" @click="send()">Send</q-btn>
      </div>
    </div>
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
  </q-page>
</template>

<script setup>
import { timeago } from 'src/util/timeago';
import { accessToChatRoom, updateChatLog } from 'src/services/apiRoomsRequests';
import {
  connectWithPeerJs,
  connectAndListenRemotePeer,
  sendToRemote,
} from 'src/services/peerJs';
import connections from 'src/services/connections';

useTitle('Vital - Homepage');

const users = {
  localUser: {
    id: '6442bfc2b1ea41306eaf8a9c',
    name: 'J.Alberto',
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
  },
  remoteUser: {
    id: '64202787a6fdd0375fedd1ab',
    name: 'Ulises',
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
  },
};
const message = ref('');
const conversation = ref([]);
const router = useRouter();
const route = useRoute();

connectWithPeerJs(users.localUser.id);

async function openChat() {
  const chatRoomData = {
    password: 'contraseña',
    id_guest: users.remoteUser.id,
    participants: [users.localUser.id, users.remoteUser.id],
  };

  const room = await accessToChatRoom(chatRoomData);

  const { chatLog, _id } = room;

  // router.push(`/chat/${_id}`);

  chatLog ? conversation.value.push(...chatLog) : undefined;

  connectAndListenRemotePeer(users.remoteUser.id);
}

function send() {
  const messageLog = {
    from: users.localUser.id,
    to: users.remoteUser.id,
    message: [message.value],
    date: new Date(),
  };
  sendToRemote(users.remoteUser.id, messageLog);
  conversation.value.push(messageLog);
  updateChatLog(messageLog);
}

function updatedAtTimeAgo(date) {
  const formattedTimeAgo = date ? timeago(date) : null;

  return formattedTimeAgo.charAt(0).toUpperCase() + formattedTimeAgo?.slice(1);
}
</script>
