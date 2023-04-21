<template>
  <q-page class="bg-grey-3 flex flex-col">
    <div class="test window flex grow">
      <div b-2px b-black text-black grow flex-col>
        <q-btn text-color="black" @click="connect()">Connect</q-btn>
        <div>ID ROOM: {{ mi_id }}</div>
        <q-input v-model="id_remote"></q-input>
        <q-input v-model="message" placeholder="Send message..."></q-input>
        <q-btn text-color="black" @click="send()">Send</q-btn>
      </div>
    </div>
    <div class="chat b-1px grow">
      <div v-for="message in chatLog" :key="message" flex flex-col>
        <q-chat-message
          v-if="message.from === mi_id"
          name="Yo"
          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
          :text="message.message"
          sent
        ></q-chat-message>
        <q-chat-message
          v-if="message.to === mi_id"
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

const mi_id = ref('');
const id_remote = ref('');
const message = ref('');
const chatLog = ref([]);

let connections = {};

const peer = new Peer();

peer.on('open', (id) => {
  console.log('Conexión con  PEERJS creada', id);
  mi_id.value = id;
});

peer.on('connection', (conn) => {
  manager(conn);
});

function connect() {
  const conn = peer.connect(id_remote.value);
  connections[id_remote.value] = conn;
  manager(conn);

  axios
    .get('http://localhost:3001/api/rooms', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SESSION_TOKEN}`,
      },
    })
    .then((res) => console.log(res));
}

function send() {
  chatLog.value.push({
    from: mi_id.value,
    to: id_remote,
    message: [message.value],
  });
  connections[id_remote.value].send(message.value);

  console.log(chatLog.value);
}

function manager(conn) {
  conn.on('open', () => {
    console.log(conn);
    id_remote.value = conn.peer;
    connections[id_remote.value] = conn;
    console.log('Conexión desde local/remoto establecida!');
  });
  conn.on('data', (data) => {
    console.log('Recibido: ', data);
    chatLog.value.push({
      from: id_remote.value,
      to: mi_id.value,
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
</script>
