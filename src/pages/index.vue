<template>
  <q-page class="bg-grey-3">
    <div class="test window flex h-40vw">
      <div b-2px b-black text-black grow flex-col>
        <q-btn text-color="black" @click="createRoom()">Create new room</q-btn>
        <div>ID ROOM: {{ id_room }}</div>
        <div>PASSWORD: {{ password }}</div>
        <q-input :model-value="message"></q-input>
        <video style="width: 300px; height: 200px" id="myVideo" />
      </div>

      <div b-2px b-black grow flex-col>
        <q-btn text-color="black" @click="answerCall()">Answer call</q-btn>
        <q-input v-model="id_room_input" placeholder="Insert ID room"></q-input>
        <q-input
          v-model="password_input"
          placeholder="Insert password"
        ></q-input>
        <div>{{ incomingMessage }}</div>
        <video style="width: 300px; height: 200px" id="friendVideo" />
      </div>
    </div>

    <q-btn text-color="black" @click="getAllRooms()">Get all rooms</q-btn>

    <div></div>
  </q-page>
</template>

<script setup>
import axios from 'axios';
import { Peer } from 'peerjs';
useTitle('Vital - Homepage');

const id_room = ref('');
const password = ref('');
const id_room_input = ref('');
const password_input = ref('');
const message = ref('');
const incomingMessage = ref('');

//Creating the Peer Server connections
const peerLocal = new Peer('pruebaDEconceptoLOCAL');
const peerRemoto = new Peer('pruebaDEconceptoREMOTO');

peerLocal.on('open', () => {
  console.log('Conexión LOCAL con PEERJS creada');
});

peerRemoto.on('open', () => {
  console.log('Conexión REMOTA con PEERJS creada');
});

//Connecting peers
const connLocal = peerLocal.connect('pruebaDEconceptoREMOTO');
const connRemota = peerRemoto.connect('pruebaDEconceptoLOCAL');
console.log('Conexión LOCAL abierta?', connLocal.open);

//Sending a message to peerRemoto
connLocal.on('open', () => {
  console.log('Conexión con REMOTO creada');
  connLocal.send('hi!');
});

//Reciving the message form peerLocal
connRemota.on('data', (data) => {
  console.log(data);
});
</script>
