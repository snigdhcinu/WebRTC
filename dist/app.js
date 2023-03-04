/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/capture_local_stream.js":
/*!*******************************************!*\
  !*** ./public/js/capture_local_stream.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"iceConfig\": () => (/* binding */ iceConfig),\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n// TODO: add logic for device-selection.\r\n// TODO: instead of creating new copies of data, import from single source.\r\n// TODO: handleDeviceChange event.\r\n// TODO: add ability to individually handle A/V tracks.\r\n\r\nconst iceConfig = {\r\n\t\"iceServers\" : [{\r\n\t\t\"urls\" : 'stun:stun.l.google.com:19302',\r\n\t}]\r\n};\r\n\r\nasync function main () {\r\n\tconst deviceKinds = ['audioinput', 'audiooutput', 'videoinput'];\r\n\tconst devicesList = await _fetchDevicesList (deviceKinds);\r\n\tconst videoStream = await _playVideoFromCamera (devicesList.videoinput);\r\n\r\n\tnavigator.mediaDevices.addEventListener ('devicechange', _handleDeviceChanges);\r\n}\r\n\r\nasync function _playVideoFromCamera (videoDevices) {\r\n\ttry {\r\n\t\tconst constraints = {\r\n\t\t\t'audio': true,\r\n\t\t\t'video': {\r\n\t\t\t\t'deviceId' : videoDevices[0].deviceId, // first time logic, then user select the one.\r\n\t\t\t\t'width'    : 1360,\r\n\t\t\t\t'height'   : 720,\r\n\t\t\t},\r\n\t\t};\r\n\r\n\t\tconst localStream           = await navigator.mediaDevices.getUserMedia (constraints);\r\n\r\n\t\t// attach local-stream to local-container.\r\n\t\tconst videoElement     = document.getElementById ('localVideo');\r\n\t\tvideoElement.srcObject = localStream;\r\n\r\n\t\t// addTracks to peerConnection\r\n\t\tconst peerConnection = new RTCPeerConnection (iceConfig);\r\n\t\tlocalStream.getTracks().forEach(track => {\r\n\t\t\tpeerConnection.addTrack(track, localStream);\r\n\t\t});\r\n\t}\r\n\tcatch (err){\r\n\t\tconsole.error (err, 'error while showing video stream from selected camera');\r\n\t}\r\n}\r\n\r\nasync function _fetchDevicesList (deviceKinds) {\r\n\tconst devices = await navigator.mediaDevices.enumerateDevices ();\r\n\tlet result    = [];\r\n\r\n\tif (!deviceKinds || !deviceKinds.length)\r\n\t\treturn result;\r\n\r\n\tdeviceKinds.forEach ((type) => {\r\n\t\tresult[type] = devices.filter (devices => devices.kind === type);\r\n\t});\r\n\r\n\treturn result;\r\n}\r\n\r\nasync function _handleDeviceChanges (event) {\r\n\t// update deviceSelection with the new list.\r\n\tconst newList = _fetchDevicesList ();\r\n}\r\n\r\n\n\n//# sourceURL=webpack://webrtc/./public/js/capture_local_stream.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _peer_connection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./peer_connection */ \"./public/js/peer_connection.js\");\n/* harmony import */ var _peer_connection__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_peer_connection__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _capture_local_stream__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./capture_local_stream */ \"./public/js/capture_local_stream.js\");\n//TODO: Import using file import, use file bundler like webpack, and refactor code accordingly\r\n//TODO: Improve error handling\r\n\r\n\r\n\r\n\r\n\r\n(async () => {\r\n    try {\r\n        await (0,_capture_local_stream__WEBPACK_IMPORTED_MODULE_1__.main) ();\r\n        await (0,_peer_connection__WEBPACK_IMPORTED_MODULE_0__.establishPeerConnection) ();\r\n    }\r\n    catch (error) {\r\n        console.error (error, \"some error occured\");\r\n    }\r\n})();\n\n//# sourceURL=webpack://webrtc/./public/js/main.js?");

/***/ }),

/***/ "./public/js/peer_connection.js":
/*!**************************************!*\
  !*** ./public/js/peer_connection.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n/*\r\n STEP 1 : SIGNALING\r\n STEP 2 : Initiating peer connection, peers share local and remote session description, each know capabilities of remote peer.\r\n STEP 3 : Ready the connection between peers, share ICE candidates b/w peers.\r\n*/\r\n\r\n// TODO : yet to implement a signaling channel\r\nconst signalingChannel = new SignalingChannel (remoteClientId);\r\n\r\nsignalingChannel.send ('Hello Peer');\r\n\r\nasync function establishPeerConnection () {\r\n    // TODO: Create you own stun server, do not use open stun servers.\r\n    const configuration = {\r\n        \"iceServers\" : [{\r\n            \"urls\" : 'stun:stun.l.google.com:19302',\r\n        }]\r\n    }\r\n\r\n    const peerConnection = new RTCPeerConnection (configuration);\r\n\r\n    signalingChannel.addEventListener ('message', async (message) => {\r\n        // For Receiving side\r\n        if (message.offer) {\r\n            peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));\r\n            const answer = await peerConnection.createAnswer();\r\n            await peerConnection.setLocalDescription(answer);\r\n            signalingChannel.send({'answer': answer});\r\n        }\r\n\r\n        // For Sending side\r\n        if (message.answer) {\r\n            const remoteDescription = new RTCSessionDescription (message.answer);\r\n            await peerConnection.setRemoteDescription (remoteDescription);\r\n        }\r\n\r\n        // listen for local ICE candidates on the local RTCPeerConnection\r\n        if (message.iceCandidate) {\r\n            try {\r\n                await peerConnection.addIceCandidate(message.iceCandidate);\r\n            } catch (e) {\r\n                console.error('Error adding received ice candidate', e);\r\n            }\r\n        }\r\n    });\r\n\r\n    const offer = await peerConnection.createOffer();\r\n    await peerConnection.setLocalDescription (offer);\r\n    signalingChannel.send ({ 'offer' : offer });\r\n}\r\n\r\n// listen for local ICE candidates on the local RTCPeerConnection\r\npeerConnection.addEventListener ('icecandidate', event => {\r\n    if (event.candidate) {\r\n        signalingChannel.send ({\r\n            'new-ice-candidate' : event.candidate,\r\n        });\r\n    }\r\n});\r\n\r\n// Listen for connectionstatechange on the local RTCPeerConnection\r\npeerConnection.addEventListener('connectionstatechange', (event) => {\r\n    if (peerConnection.connectionState === 'connected') {\r\n        console.log ('Peers connected');\r\n    }\r\n});\r\n\r\nmodule = { establishPeerConnection }\n\n//# sourceURL=webpack://webrtc/./public/js/peer_connection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/main.js");
/******/ 	
/******/ })()
;