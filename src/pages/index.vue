<template>
  <q-page class="bg-grey-3 flex flex-col">
    <div class="test window flex grow">
      <div b-2px b-black text-black grow flex-col>
        <q-btn text-color="black" @click="openChat()"
          >Chat with {{ users.remoteUser.name }}</q-btn
        >
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { connectWithPeerJs } from 'src/services/peerJs';
import { accessToChatRoom } from 'src/services/apiRoomsRequests';
import { connectAndListenRemotePeer } from 'src/services/peerJs';
import users from 'src/services/users';

useTitle('Are U Talking 2 Me?');

const router = useRouter();

onMounted(() => {
  connectWithPeerJs(users.localUser.id);
});

async function openChat() {
  const chatRoomData = {
    password: 'contraseña',
    id_guest: users.remoteUser.id,
    participants: [users.localUser.id, users.remoteUser.id],
  };

  const room = await accessToChatRoom(chatRoomData);

  const { _id } = room;

  connectAndListenRemotePeer(users.remoteUser.id);

  router.push(`/chat/${_id}`);
}
</script>
