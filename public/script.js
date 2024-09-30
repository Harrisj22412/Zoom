const e = require("express");
const videoGrid = document.getElementById('video-grid');

const mypeer = new myPeer(undefined,  {
    host: '/',
    port: '3001'
}); 

const myVideo = document.createElement('video');
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream);
    })
})

const socket = io('/');

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})

myPeer.on('call', call => {
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    })
})

socket.on('user-connected', userId => {
    console.log('User connected: ' + userId)
})

socket.on('user-disconnected', userId => {
    console.log('User disconnected: ' + userId)
})

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    })
    call.on('close', () => {
        video.remove();
    })
}