import { Peer } from 'peerjs';
import { useAuthStore } from 'src/stores/auth';

const connections = {};
let peer = undefined;

function createNewPeer() {
  const authStore = useAuthStore();
  peer = new Peer(authStore.user._id);
}

function connectWithPeerJs() {
  peer.on('open', (id) => {
    console.log('Conexión con  PEERJS creada', id);
  });
  peer.on('error', (error) => {
    console.log(error);
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
  const conn = peer.connect(remoteUserId);

  connections[remoteUserId] = conn;

  sessionStorage.setItem(`conn:${remoteUserId}`, `${conn.connectionId}`);

  listenToRemotePeer(conn, remoteUserId);
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
  console.log({ connections });
  connections[remoteUserId].send(messageLog);
}

function disconnectFromPeerJs() {
  peer.disconnect();
}

export {
  connectWithPeerJs,
  connectRemotePeer,
  sendToRemote,
  createNewPeer,
  disconnectFromPeerJs,
};
