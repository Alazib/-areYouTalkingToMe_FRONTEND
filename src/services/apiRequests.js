async function accessToChatRoom(chatRoomData) {
  axios({
    method: 'POST',
    url: 'http://localhost:3001/api/rooms',
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

export { accessToChatRoom };
