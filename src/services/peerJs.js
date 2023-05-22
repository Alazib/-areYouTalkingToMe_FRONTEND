import { Peer } from 'peerjs';
import users from 'src/services/users';

const connections = {};

const peer = new Peer(users.localUser.id);

function connectWithPeerJs() {
  peer.on('open', (id) => {
    console.log('Conexión con  PEERJS creada', id);
  });

  peer.on('connection', (conn) => {
    alert('Ulises ha conectado contigo');

    sessionStorage.setItem(`conn:${conn.peer}`, `${conn.connectionId}`);
    connections[conn.peer] = conn;

    conn.on('data', (data) => {
      console.log('2: CONEXIÓN AL RECIBIR', conn);
      alert('mensaje llegando a local');
      console.log(data.message);
    });
  });
}

function connectRemotePeer(remoteUserId) {
  if (!sessionStorage.getItem(`conn:${remoteUserId}`)) {
    const conn = peer.connect(remoteUserId);

    connections[remoteUserId] = conn;
    sessionStorage.setItem(`conn:${remoteUserId}`, `${conn.connectionId}`);

    listenToRemotePeer(conn, remoteUserId);
  }
}

function listenToRemotePeer(conn) {
  conn.on('open', () => {
    console.log('1: CONEXIÓN NADA MAS CONECTAR', conn);
    console.log('Conexión con remoto creada');
  });
  conn.on('data', (data) => {
    console.log('2: CONEXIÓN AL RECIBIR', conn);
    alert('mensaje llegando a local');
    console.log(data);
  });
}

function sendToRemote(remoteUserId, messageLog) {
  console.log('3 CONEXIÓN AL ENVIAR MENSAJE');

  connections[remoteUserId].send(messageLog);
}

export { connectWithPeerJs, connectRemotePeer, sendToRemote };
