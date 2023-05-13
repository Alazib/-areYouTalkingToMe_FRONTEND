import { Peer } from 'peerjs';

const connections = {};
const users = {
  localUser: {
    id: '6442bfc2b1ea41306eaf8a9c',
    name: 'J.Alberto',
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
  },
  remoteUser: {
    id: '64202787a6fdd0375fedd1ab',
    name: 'Ulises',
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
  },
};
//Tengo que sacar users de aquí, pero entonces ¿cómo gestiono la creación del new Peer?

const peer = new Peer(users.localUser.id);

function connectWithPeerJs() {
  peer.on('open', (id) => {
    console.log('Conexión con  PEERJS creada', id);
  });
}

function connectAndListenRemotePeer(remoteUserID) {
  const conn = peer.connect(remoteUserID);

  conn.on('open', () => {
    connections[remoteUserID] = conn;
    console.log('Conexión con remoto creada');
  });

  conn.on('data', (data) => {
    alert('mensaje llegando');
    conversation.value.push(data);
  });
}

function sendToRemote(remoteUserId, messageLog) {
  console.log(connections[remoteUserId]);

  connections[remoteUserId].send(messageLog);
}

export { connectWithPeerJs, connectAndListenRemotePeer, sendToRemote };
