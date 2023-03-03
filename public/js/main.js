const captureLocalStream = require ('./capture_local_stream');
const peerConnection     = require ('./peer_connection');

(async () => {
    await captureLocalStream ();
    await peerConnection ();

})();