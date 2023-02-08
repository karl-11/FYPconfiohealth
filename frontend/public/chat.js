const chatList = document.querySelector('#chat-list');
const messageInput = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-button');

//paste this line whenever we need api or endpoints
const baseUrl = "http://34.224.225.183:3000";
const windowUrl = "http://34.224.225.183:3001";

sendButton.addEventListener('click', (event) => {
    // event.preventDefault();
    // const message = messageInput.value;
    // if (!message) return;

    // const li = document.createElement('li');
    // li.classList.add('list-group-item');
    // li.textContent = message;
    // chatList.appendChild(li);
    // messageInput.value = '';

    var id = localStorage.getItem('loggedInUserID')
    var receiverID = 1;
    var content = messageInput.value;
    var requestBody = {
        senderID: id,
        receiverID: receiverID,
        content: content,
    };

    axios.post(`${baseUrl}/sendMessages`, requestBody).then(function (response) {

    })
});


