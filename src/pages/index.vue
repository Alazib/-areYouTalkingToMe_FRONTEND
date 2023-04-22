<template>
  <q-page class="bg-grey-3 flex flex-col">
    <div class="test window flex grow">
      <div b-2px b-black text-black grow flex-col>
        <q-btn text-color="black" @click="connect()"
          >Chat with {{ users.remotelUser.name }}</q-btn
        >

        <q-input v-model="message" placeholder="Send message..."></q-input>
        <q-btn text-color="black" @click="send()">Send</q-btn>
      </div>
    </div>
    <div class="chat b-1px grow">
      <div v-for="message in chatLog" :key="message" flex flex-col>
        <q-chat-message
          v-if="message.from === localPeerId"
          name="Yo"
          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
          :text="message.message"
          sent
        ></q-chat-message>
        <q-chat-message
          v-if="message.to === localPeerId"
          name="María"
          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
          :text="message.message"
        ></q-chat-message>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { Peer } from 'peerjs';
useTitle('Vital - Homepage');
import axios from 'axios';

const localPeerId = ref('');
const remotePeerId = ref('');
const message = ref('');
const chatLog = ref([]);

let connections = {};

const users = {
  localUser: {
    id: '6442bfc2b1ea41306eaf8a9c',
    name: 'J.Alberto',
  },
  remotelUser: {
    id: '64202787a6fdd0375fedd1ab',
    name: 'Ulises',
  },
};

const peer = new Peer(users.localUser.id);

peer.on('open', (id) => {
  console.log('Conexión con  PEERJS creada', id);
  localPeerId.value = id;
});

function connect() {
  const conn = peer.connect(users.remotelUser.id);
  connections[users.remotelUser.id] = conn;
  connectionHandler(conn);

  // axios
  //   .get('http://localhost:3001/api/rooms', {
  //     headers: {
  //       Authorization: `Bearer ${import.meta.env.VITE_SESSION_TOKEN}`,
  //     },
  //   })
  //   .then((res) => console.log(res));
}

peer.on('connection', (conn) => {
  connectionHandler(conn);
});

function connectionHandler(conn) {
  conn.on('open', () => {
    console.log(conn);
    remotePeerId.value = conn.peer;
    connections[remotePeerId.value] = conn;
    alert('CONEXIÓN CON REMOTO CREADA');
  });
  conn.on('data', (data) => {
    console.log('Recibido: ', data);
    chatLog.value.push({
      from: remotePeerId.value,
      to: localPeerId.value,
      message: [data],
    });
  });
  conn.on('error', (err) => {
    console.log(err);
  });
  conn.on('close', () => {
    console.log('Conexión CERRADA');
  });
}

function send() {
  chatLog.value.push({
    from: localPeerId.value,
    to: remotePeerId,
    message: [message.value],
  });
  connections[remotePeerId.value].send(message.value);

  console.log(chatLog.value);
}
</script>
