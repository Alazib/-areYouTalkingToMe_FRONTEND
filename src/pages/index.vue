<template>
  <q-page class="bg-grey-3">
    <div class="test window flex h-40vw">
      <div b-2px b-black text-black grow flex-col>
        <q-btn text-color="black" @click="connect()">Connect</q-btn>
        <div>ID ROOM: {{ id_room }}</div>
        <q-input v-model="id_other_room"></q-input>
        <q-input v-model="send" placeholder="Send message..."></q-input>
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

const id_room = ref('');
const id_other_room = ref('');
const message = ref('');
const send = ref('');

//Creating the Peer Server connections
const peer = new Peer();

peer.on('open', (id) => {
  console.log('Conexión con PEERJS creada', id);
  id_room.value = id;
});

// Handle  data connection
peer.on('connection', (conn) => {
  alert('Conexión desde remoto establecida!');

  //Reciving from remote
  conn.on('data', (data) => {
    console.log('Recibido', data);
  });
  //Sending to remote
  conn.on('open', () => {
    conn.send('hello!');
  });
});

//Connecting peers
function connect() {
  console.log(id_other_room.value);
  const conn = peer.connect(id_other_room.value);
  //Sending a message to peerRemoto
  conn.on('open', () => {
    console.log('Conexión con REMOTO creada');
    conn.send(send.value);
  });
  conn.on('error', (err) => {
    console.log(err);
  });
}
</script>
