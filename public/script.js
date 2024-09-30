const e = require("express");
const mypeer = new myPeer(undefined,  {
    host: '/',
    port: '3001'
}); 

const socket = io('/');

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})


socket.on('user-connected', userId => {
    console.log('User connected: ' + userId)
})