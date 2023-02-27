(async () => await main ())();

async function main () {
	// playAudioFromMic selected.
	// update deviceSelection with fetched list.
	// addEventListener for `deviceChange`
	const deviceKinds = ['audioinput', 'audiooutput', 'videoinput'];
	const devicesList = await _fetchDevicesList (deviceKinds);
	const videoStream = await playVideoFromCamera (devicesList.videoinput);

	navigator.mediaDevices.addEventListener ('devicechange', _handleDeviceChanges);
}

async function playVideoFromCamera (videoDevices) {
	try {
		const videoWidth  = 1360;
		const videoHeight = 720;
		const constraints = {
			'audio': true,
			'video': {
				'deviceId' : videoDevices[0].deviceId, // first time logic, then user select the one.
				'width'    : videoWidth,
				'height'   : videoHeight,
			},
		};

		const stream           = await navigator.mediaDevices.getUserMedia (constraints);
		const videoElement     = document.getElementById ('localVideo');
		videoElement.srcObject = stream;

		_resizeVideoElement(videoWidth, videoHeight);
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

function _resizeVideoElement (width, height) {
	const w2h = width / height;
	// do maths here, for now hardcoding in css in w2h ratio.
}
