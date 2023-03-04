const main = (peerConnection) => {
    const remoteVideo = document.querySelector('#remoteVideo');

    // attach incoming track on peerConnection to remoteVideo
    peerConnection.addEventListener('track', async (event) => {
        const [remoteStream] = event.streams;
        remoteVideo.srcObject = remoteStream;
    });
}

export { main };