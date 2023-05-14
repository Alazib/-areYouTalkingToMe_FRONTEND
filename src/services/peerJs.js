import { Peer } from 'peerjs';
import users from 'src/services/users';

const connections = {};

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
