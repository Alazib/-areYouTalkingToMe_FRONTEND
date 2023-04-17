<template>
  <q-page class="bg-grey-3">
    <div class="test window flex h-40vw">
      <div b-2px b-black text-black grow flex-col>
        <q-btn text-color="black" @click="connect()">Connect</q-btn>
        <div>ID ROOM: {{ mi_id }}</div>
        <q-input v-model="id_remote"></q-input>
        <q-input v-model="message" placeholder="Send message..."></q-input>
        <q-btn text-color="black" @click="send()">Send</q-btn>

        <span>{{ message }}</span>
        <video style="width: 300px; height: 200px" id="myVideo" />
      </div>
    </div>
    <div></div>
  </q-page>
</template>

<script setup>
import { Peer } from 'peerjs';
useTitle('Vital - Homepage');

const mi_id = ref('');
const id_remote = ref('');
const message = ref('');
let connections = {};

//Creating the Peer Server connections
const peer = new Peer();

peer.on('open', (id) => {
  console.log('Conexión con PEERJS creada', id);
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
  });
  conn.on('error', (err) => {
    console.log(err);
  });
  conn.on('close', () => {
    console.log('Conexión CERRADA');
  });
}
</script>
