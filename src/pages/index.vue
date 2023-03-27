<template>
  <q-page class="bg-grey-3">
    <div class="test window flex h-40vw">
      <div b-2px b-black text-black grow flex-col>
        <q-btn text-color="black" @click="createRoom()">Create new room</q-btn>
        <div>ID ROOM: {{ id_room }}</div>
        <div>PASSWORD: {{ password }}</div>
      </div>
      <div b-2px b-black grow>
        <q-btn text-color="black" @click="answerCall()">Answer call</q-btn>
        <q-input v-model="id_room_input" placeholder="Insert ID room"></q-input>
        <q-input
          v-model="password_input"
          placeholder="Insert password"
        ></q-input>
      </div>
    </div>

    <q-btn text-color="black" @click="getAllRooms()">Get all rooms</q-btn>

    <div></div>
  </q-page>
</template>

<script setup>
import axios from 'axios';
useTitle('Vital - Homepage');

const id_room = ref('');
const password = ref('');
const id_room_input = ref('');
const password_input = ref('');

function getAllRooms() {
  axios({
    method: 'get',
    url: 'http://localhost:3001/api/rooms',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFkZDg0Y2EyZGE3MGRhOTViOWU1MDUiLCJyb2xlIjpbInVzZXIiXSwiaWF0IjoxNjc5ODIyNTIyLCJleHAiOjE2ODI0MTQ1MjJ9.eZmc466hOt83ZNtJRRt2KNuZ2EHHj6IlkWni4mtmf9A',
    },
  }).then((res) => {
    id_room.value = res.data.data[0]._id;
    password.value = res.data.data[0].password;
  });
}

function createRoom() {
  axios({
    method: 'post',
    url: 'http://localhost:3001/api/rooms',
    data: {
      id_host: '000000',
      password: 'password_prueba',
    },
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFkZDg0Y2EyZGE3MGRhOTViOWU1MDUiLCJyb2xlIjpbInVzZXIiXSwiaWF0IjoxNjc5ODIyNTIyLCJleHAiOjE2ODI0MTQ1MjJ9.eZmc466hOt83ZNtJRRt2KNuZ2EHHj6IlkWni4mtmf9A',
    },
  }).then((res) => {
    console.log(res.data);
    id_room.value = res.data.data.id_room;
  });
}

function answerCall() {
  if (id_room.value === id_room_input.value) {
    alert('bien');
  }
}
</script>
