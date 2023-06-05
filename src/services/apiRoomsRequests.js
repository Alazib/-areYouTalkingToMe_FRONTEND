import { useAuthStore } from 'src/stores/auth';

async function accessToChatRoom(chatRoomData) {
  const authStore = useAuthStore();

  return axios({
    method: 'POST',
    url: import.meta.env.VITE_API_ROOMS,
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
    data: chatRoomData,
  }).then((res) => {
    const room = res.data.data;

    return room;
  });
}

async function getChatLog(id_room) {
  const authStore = useAuthStore();

  return axios({
    url: `${import.meta.env.VITE_API_ROOMS}/${id_room}`,
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  }).then((res) => {
    return res.data.data.chatLog;
  });
}

function updateChatLog(messageLog, id_room) {
  const authStore = useAuthStore();

  axios({
    method: 'PUT',
    url: import.meta.env.VITE_API_ROOMS,
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
    data: {
      messageLog: messageLog,
      id_room: id_room,
    },
  }).then((res) => console.log(res.data));
}

export { accessToChatRoom, updateChatLog, getChatLog };
