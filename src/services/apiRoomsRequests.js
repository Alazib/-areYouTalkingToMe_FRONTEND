async function accessToChatRoom(chatRoomData) {
  return axios({
    method: 'POST',
    url: import.meta.env.VITE_API_ROOMS,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SESSION_TOKEN}`,
    },
    data: chatRoomData,
  }).then((res) => {
    const room = res.data.data;

    return room;
  });
}

function updateChatLog(messageLog) {
  axios({
    method: 'PUT',
    url: import.meta.env.VITE_API_ROOMS,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SESSION_TOKEN}`,
    },
    data: {
      messageLog: messageLog,
    },
  }).then((res) => console.log(res.data));
}

export { accessToChatRoom, updateChatLog };
