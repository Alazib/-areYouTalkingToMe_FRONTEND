<template>
  <q-page class="bg-grey-3 flex flex-col">
    <div class="test window flex grow">
      <div b-2px b-black text-black grow flex-col>
        <q-btn text-color="black" @click="connect()"
          >Chat with {{ users.remoteUser.name }}</q-btn
        >

        <q-input v-model="message" placeholder="Send message..."></q-input>
        <q-btn text-color="black" @click="send()">Send</q-btn>
      </div>
    </div>
    <div class="chat b-1px grow">
      <div v-for="message in chatLog" :key="message" flex flex-col>
        <q-chat-message
          v-if="message.from === users.localUser.id"
          :name="users.localUser.name"
          :avatar="users.localUser.avatar"
          :text="message.message"
          sent
        ></q-chat-message>
        <q-chat-message
          v-if="message.from === users.remoteUser.id"
          :name="users.remoteUser.name"
          :avatar="users.remoteUser.avatar"
          :text="message.message"
        ></q-chat-message>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { Peer } from 'peerjs';
import axios from 'axios';
useTitle('Vital - Homepage');

const message = ref('');
const chatLog = ref([]);
let chatRoom_id = '';
let connections = {};

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

const peer = new Peer(users.localUser.id);

peer.on('open', (id) => {
  console.log('Conexión con  PEERJS creada', id);
});

function connect() {
  axios({
    method: 'POST',
    url: 'http://localhost:3001/api/rooms',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SESSION_TOKEN}`,
    },
    data: {
      password: 'contraseña',
      id_guest: users.remoteUser.id,
    },
  }).then((res) => {
    chatRoom_id = res.data.data._id;
    if (res.data.data.chatAlreadyExists) {
      axios({
        method: 'GET',
        url: `http://localhost:3001/api/rooms/${chatRoom_id}`,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SESSION_TOKEN}`,
        },
        data: {
          password: 'contraseña',
          id_guest: users.remoteUser.id,
        },
      }).then((res) => {
        chatLog.value.push(...res.data.data.chatLog);
      });
    }
  });

  const conn = peer.connect(users.remoteUser.id);

  connectionHandler(conn);
}

peer.on('connection', (conn) => {
  connectionHandler(conn);
});

function connectionHandler(conn) {
  conn.on('open', () => {
    connections[users.remoteUser.id] = conn;
    alert(`Conexión con ${users.remoteUser.name} creada`);
  });

  conn.on('data', (data) => {
    chatLog.value.push({
      from: users.remoteUser.id,
      to: users.localUser.id,
      message: [data],
    });
  });
}

function send() {
  connections[users.remoteUser.id].send(message.value);

  chatLog.value.push({
    from: users.localUser.id,
    to: users.remoteUser.id,
    message: [message.value],
  });

  axios({
    method: 'PUT',
    url: `http://localhost:3001/api/rooms/${chatRoom_id}`,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SESSION_TOKEN}`,
    },
    data: {
      messageLog: {
        from: users.localUser.id,
        to: users.remoteUser.id,
        message: [message.value],
      },
    },
  }).then((res) => console.log(res));
}
</script>
