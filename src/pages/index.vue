<template>
  <q-page class="bg-grey-3 flex flex-col">
    <div class="test window flex h-40vw">
      <div b-2px b-black text-black grow flex-col>
        <q-btn text-color="black" @click="connect()">Connect</q-btn>
        <div>ID ROOM: {{ mi_id }}</div>
        <q-input v-model="id_remote"></q-input>
        <q-input v-model="message" placeholder="Send message..."></q-input>
        <q-btn text-color="black" @click="send()">Send</q-btn>
      </div>
    </div>
    <div class="chat b-1px">
      <q-chat-message
        name="Local"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="outgoingMessages"
        sent
      />

      <q-chat-message
        name="Remoto"
        avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        :text="incomingMessages"
      />
    </div>
  </q-page>
</template>

<script setup>
import { Peer } from 'peerjs';
useTitle('Vital - Homepage');

const mi_id = ref('');
const id_remote = ref('');
const message = ref('');
const outgoingMessages = reactive(['1', '3']);
const incomingMessages = reactive(['2', '4']);
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
}

function send() {
  connections[id_remote.value].send(message.value);
  outgoingMessages.push(message.value);
}

function manager(conn) {
  conn.on('open', () => {
    console.log(conn);
    id_remote.value = conn.peer;
    connections[id_remote.value] = conn;
    console.log('Conexión desde local/remoto establecida!');
  });
  conn.on('data', (data) => {
    incomingMessages.push(data);
    console.log('Recibido: ', data);
  });
  conn.on('error', (err) => {
    console.log(err);
  });
  conn.on('close', () => {
    console.log('Conexión CERRADA');
  });
}
</script>
