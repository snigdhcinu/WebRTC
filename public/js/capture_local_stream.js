// TODO: add logic for device-selection.
// TODO: instead of creating new copies of data, import from single source.
// TODO: handleDeviceChange event.
// TODO: add ability to individually handle A/V tracks.

async function main (peerConnection) {
	const deviceKinds = ['audioinput', 'audiooutput', 'videoinput'];
	const devicesList = await _fetchDevicesList (deviceKinds);
	const videoStream = await _playVideoFromCamera (devicesList.videoinput, peerConnection);

	navigator.mediaDevices.addEventListener ('devicechange', _handleDeviceChanges);
}

async function _playVideoFromCamera (videoDevices, peerConnection) {
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

export { iceConfig, main };