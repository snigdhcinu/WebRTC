const main = (peerConnection, dataChannel) => {
    // listening for any incoming message from dataChannel, as a peer.
    peerConnection.addEventListener('datachannel', (event) => {
        const dataChannel = event.channel;
    });


    // For chat feature.
    const messageBox       = document.querySelector('#messageBox');
    const sendButton       = document.querySelector('#sendButton');
    const incomingMessages = document.querySelector('#incomingMessages');

    // Enable textarea and button when opened
    dataChannel.addEventListener('open', (event) => {
        messageBox.disabled = false;
        messageBox.focus();
        sendButton.disabled = false;
    });

    // Disable input when closed
    dataChannel.addEventListener('close', (event) => {
        messageBox.disabled = false;
        sendButton.disabled = false;
    });

    // send message from the dataChannel, when clicked on send button
    sendButton.addEventListener('click', (event) => {
        const message = messageBox.textContent;
        dataChannel.send(message);
    })

    // Append new messages to the box of incoming messages
    dataChannel.addEventListener('message', (event) => {
        const message = event.data;
        incomingMessages.textContent += message + '\n';
    });
}

export { main };