async function accessToChatRoom(chatRoomData) {
  return axios({
    method: 'POST',
    url: import.meta.env.VITE_API_ROOMS,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SESSION_TOKEN}`,
    },
    data: chatRoomData,
  }).then((res) => {
    const { chatAlreadyExists } = res.data;
    const { chatLog } = res.data.data;

    if (chatAlreadyExists) {
      return chatLog;
    }
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
