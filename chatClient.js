let websocket;
let pseudo = prompt("Enter your name :");

createWebSocket();

function createWebSocket() {
  websocket = new WebSocket('ws://localhost:12345');
  let chatSend = document.getElementById('chat-send');
  chatSend.addEventListener("submit", sendMessage);

  websocket.onmessage = function(event) {
    console.log(event.data);
    printMessage(event);
  }
}

function printMessage(event){
  let data = event.data;
  let chat = document.getElementById("textAreaChat");
  let oldData = document.getElementById("textAreaChat").value;
  if (data != ""){
      if (oldData != ""){
          chat.innerHTML = oldData + "\n" + data;
          document.getElementById("inlineFormInputGroup").value = "";
      }
      else {
          chat.innerHTML = data;
          document.getElementById("inlineFormInputGroup").value = "";
      }
  }
}

function sendMessage(event) {
   event.preventDefault();
   let msg = pseudo + " : " + document.getElementById('inlineFormInputGroup').value;
   websocket.send(msg);
}
