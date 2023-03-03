// TODO: add logic for device-selection.
// TODO: instead of creating new copies of data, import from single source.

async function main () {
	// playAudioFromMic selected.
	// update deviceSelection with fetched list.
	// addEventListener for `deviceChange`
	const deviceKinds = ['audioinput', 'audiooutput', 'videoinput'];
	const devicesList = await _fetchDevicesList (deviceKinds);
	const videoStream = await _playVideoFromCamera (devicesList.videoinput);

	navigator.mediaDevices.addEventListener ('devicechange', _handleDeviceChanges);
}

async function _playVideoFromCamera (videoDevices) {
	try {
		const constraints = {
			'audio': true,
			'video': {
				'deviceId' : videoDevices[0].deviceId, // first time logic, then user select the one.
				'width'    : 1360,
				'height'   : 720,
			},
		};

		const localStream           = await navigator.mediaDevices.getUserMedia (constraints);

		// attach local-stream to local-container.
		const videoElement     = document.getElementById ('localVideo');
		videoElement.srcObject = localStream;

		// addTracks to peerConnection
		const iceConfig = {
			"iceServers" : [{
				"urls" : 'stun:stun.l.google.com:19302',
			}]
		};
		const peerConnection = new RTCPeerConnection (iceConfig);
		localStream.getTracks().forEach(track => {
			peerConnection.addTrack(track, localStream);
		});
	}
	catch (err){
		console.error (err, 'error while showing video stream from selected camera');
	}
}

async function _fetchDevicesList (deviceKinds) {
	const devices = await navigator.mediaDevices.enumerateDevices ();
	let result    = [];

	if (!deviceKinds || !deviceKinds.length)
		return result;

	deviceKinds.forEach ((type) => {
		result[type] = devices.filter (devices => devices.kind === type);
	});

	return result;
}

async function _handleDeviceChanges (event) {
	// update deviceSelection with the new list.
	const newList = _fetchDevicesList ();
}

//module.exports = main;