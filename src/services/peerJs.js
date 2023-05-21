import { Peer } from 'peerjs';
import users from 'src/services/users';

const connections = {};

const peer = new Peer(users.localUser.id);

function connectWithPeerJs() {
  peer.on('open', (id) => {
    console.log('Conexión con  PEERJS creada', id);
  });
  peer.on('connection', (connection) => {
    alert('Ulises ha conectado contigo');
    // connections[remoteUserID] = connection;

    connection.on('data', (data) => {
      console.log('2: CONEXIÓN AL RECIBIR', connection);
      alert('mensaje llegando a local');
      console.log(data);
    });
  });
}

function connectAndListenRemotePeer(remoteUserID) {
  const conn = peer.connect(remoteUserID);
  console.log('1: CONEXIÓN NADA MAS CONECTAR', conn);

  conn.on('open', () => {
    connections[remoteUserID] = conn;
    console.log('Conexión con remoto creada');
  });
  conn.on('data', (data) => {
    console.log('2: CONEXIÓN AL RECIBIR', connection);
    alert('mensaje llegando a local');
    console.log(data);
  });
}

function sendToRemote(remoteUserId, messageLog) {
  console.log('3 CONEXIÓN AL ENVIAR MENSAJE', connections[remoteUserId]);

  connections[remoteUserId].send(messageLog);
}

export { connectWithPeerJs, connectAndListenRemotePeer, sendToRemote };
