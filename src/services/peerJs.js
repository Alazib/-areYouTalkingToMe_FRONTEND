import { Peer } from 'peerjs';
import connections from 'src/services/connections';

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

//peer2 is only in order to simulate the remote user
// const peer2 = new Peer(users.remoteUser.id);

function connectWithPeerJs() {
  peer.on('open', (id) => {
    console.log('Conexión con  PEERJS creada', id);
  });

  //peer2 is only in order to simulate the remote user
  // peer2.on('open', (id) => {
  //   console.log('Conexión con  PEERJS creada', id);
  // });
}

function connectAndListenRemotePeer(remoteUserID) {
  const conn = peer.connect(remoteUserID);

  conn.on('open', () => {
    connections[users.remoteUser.id] = conn;
    console.log('Conexión con remoto creada');
  });

  return conn;
}

function sendToRemote(remoteUserId, messageLog) {
  connections[remoteUserId].send(messageLog);
  console.log(connections[remoteUserId]);
}

export { connectWithPeerJs, connectAndListenRemotePeer, sendToRemote };
