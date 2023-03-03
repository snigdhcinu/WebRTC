/*
 STEP 1 : SIGNALING
 STEP 2 : Initiating peer connection, peers share local and remote session description, each know capabilities of remote peer.
 STEP 3 : Ready the connection between peers, share ICE candidates b/w peers.
*/

// TODO : yet to implement a signaling channel
const signalingChannel = new SignalingChannel (remoteClientId);

signalingChannel.send ('Hello Peer');

async function establistPeerConnection () {
    // TODO: Create you own stun server, do not use open stun servers.
    const configuration = {
        "iceServers" : [{
            "urls" : 'stun:stun.l.google.com:19302',
        }]
    }

    const peerConnection = new RTCPeerConnection (configuration);

    signalingChannel.addEventListener ('message', async (message) => {
        // For Receiving side
        if (message.offer) {
            peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            signalingChannel.send({'answer': answer});
        }

        // For Sending side
        if (message.answer) {
            const remoteDescription = new RTCSessionDescription (message.answer);
            await peerConnection.setRemoteDescription (remoteDescription);
        }

        // listen for local ICE candidates on the local RTCPeerConnection
        if (message.iceCandidate) {
            try {
                await peerConnection.addIceCandidate(message.iceCandidate);
            } catch (e) {
                console.error('Error adding received ice candidate', e);
            }
        }
    });

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription (offer);
    signalingChannel.send ({ 'offer' : offer });
}

// listen for local ICE candidates on the local RTCPeerConnection
peerConnection.addEventListener ('icecandidate', event => {
    if (event.candidate) {
        signalingChannel.send ({
            'new-ice-candidate' : event.candidate,
        });
    }
});

// Listen for connectionstatechange on the local RTCPeerConnection
peerConnection.addEventListener('connectionstatechange', (event) => {
    if (peerConnection.connectionState === 'connected') {
        console.log ('Peers connected');
    }
});

//module.exports = establistPeerConnection;