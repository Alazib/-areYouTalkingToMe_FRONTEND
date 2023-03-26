<template>
  <q-page class="bg-grey-3 text-purple-50">
    <q-btn text-color="black" @click="getAllRooms()">Get all rooms</q-btn>
    <q-btn text-color="black" @click="createRoom()">Create new room</q-btn>
    <div></div>
  </q-page>
</template>

<script setup>
import axios from 'axios';
useTitle('Vital - Homepage');

function getAllRooms() {
  axios({
    method: 'get',
    url: 'http://localhost:3001/api/rooms',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFkZDg0Y2EyZGE3MGRhOTViOWU1MDUiLCJyb2xlIjpbInVzZXIiXSwiaWF0IjoxNjc5ODIyNTIyLCJleHAiOjE2ODI0MTQ1MjJ9.eZmc466hOt83ZNtJRRt2KNuZ2EHHj6IlkWni4mtmf9A',
    },
  }).then((res) => console.log(res.data));
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
  }).then((res) => console.log(res.data));
}
</script>
