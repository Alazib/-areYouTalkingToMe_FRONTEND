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

//Creating the a Peer Server connection.
const peer1 = new Peer('pruebaDEconceptoLOCAL');
const peer2 = new Peer('pruebaDEconceptoREMOTO');

peer1.on('open', () => {
  console.log('Conexión LOCAL abierta');
});
peer2.on('open', () => {
  console.log('Conexión REMOTA abierta');
});

//Connecting with peer2
const conn = peer1.connect('pruebaDEconceptoREMOTO');

//Sending a message to peer2
conn.on('open', () => {
  console.log('Conexión creada');
  conn.send('hi!');
});

//Reciving the message form peer1
peer2.on('connection', (conn) => {
  conn.on('data', (data) => {
    // Will print 'hi!'
    console.log(data);
  });
});
</script>
