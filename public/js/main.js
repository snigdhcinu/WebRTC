//TODO: Improve error handling

import { main as dataChannel }             from './data_channels';
import { establishPeerConnection }         from './peer_connection';
import { main as captureLocalStream }      from './capture_local_stream';
import { main as captureRemoteStream }     from './capture_remote_streama';

// TODO: Create you own stun server, do not use open stun servers.
const iceConfig = {
    "iceServers" : [{
        "urls" : 'stun:stun.l.google.com:19302',
    }]
};
const peerConnection = new RTCPeerConnection (iceConfig);
const dataChannel    = peerConnection.createDataChannel();

(async () => {
    try {
        await captureLocalStream (peerConnection);
        await establishPeerConnection (peerConnection);
        await captureRemoteStream (peerConnection);
        await dataChannel (peerConnection, dataChannel);
    }
    catch (error) {
        console.error (error, "some error occured");
    }
})();