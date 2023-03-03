// TODO: after using webpacks, perform single source of truth.
const remoteVideo = document.querySelector('#remoteVideo');

// addTracks to peerConnection
const iceConfig = {
    "iceServers" : [{
        "urls" : 'stun:stun.l.google.com:19302',
    }]
};

const peerConnection = new RTCPeerConnection (iceConfig);

peerConnection.addEventListener('track', async (event) => {
    const [remoteStream] = event.streams;
    remoteVideo.srcObject = remoteStream;
});