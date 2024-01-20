function app() {
  let remainingTeleports = 99;
  let count = 0; //1
  
    function init() {
      const assistant = document.createElement('div');
      assistant.setAttribute('id', 'root');
      assistant.classList.add('assistant');
      document.body.appendChild(assistant);

      const speechBubble = document.createElement('div');
      speechBubble.setAttribute('id', 'bubble');
      speechBubble.classList.add('speech-bubble');
      assistant.appendChild(speechBubble);

      const textInSpeechBubble = document.createElement('h1');
      textInSpeechBubble.textContent = 'How can I help?';
      textInSpeechBubble.classList.add('popup');
      speechBubble.appendChild(textInSpeechBubble);

      const closeButton = document.createElement('button');
      closeButton.innerHTML = 'Go away';
      closeButton.classList.add('btn', 'btn-outline-danger', 'position-fixed', 'bottom-0', 'right-0', 'm-2');
      speechBubble.appendChild(closeButton);

      originalPosition = { x: assistant.offsetLeft, y: assistant.offsetTop };
        
      let clicked = false;
      let loaded = true;
      const answers = [
        "I have no clue how to help you.",                                                                                  	//0
        "This link might be useful: https://puginarug.com",
        "¿Por qué tradujiste esto? No es de ninguna ayuda.",
        "Say please.",
        "Go straight for 400m, then make a left and then take the first U-Turn you see. Congrats, you arrived at your destination.",
        "I think Google might help.",
        "Think harder."
      ];
        
      function displayChatBox() {
        const inputHTML = `
        <div id="mainChat">
          <div id="chatHeader">
            <p id="chatboxTitle">Chat</p>
            <button id="closeChatBox" class="btn btn-danger" type="button">&times</button>
          </div>
          <div id="messagesContainer">
            <div id="messages" type="text"></div>
          </div>
          <input id="input" type="text" placeholder="Ask me anything!" autocomplete="off" autofocus="on"/>
        </div>`;
        
        document.body.innerHTML += inputHTML;
        const inputField = document.getElementById("input")
        inputField.addEventListener("keydown", function(e) {
          if (loaded && e.code === "Enter" && inputField.value != "") {
              loaded = false;
              let input = inputField.value;
              inputField.value = "";
              output(input);
          }
        });
        
        document.getElementById('closeChatBox').addEventListener('click', async event => {
          document.getElementById('mainChat').style.display = 'none';
          clicked = false;
          remainingTeleports = 99;
          count = 0;
        })
      }
      
      function output(input) {
        let product;
        product = answers[Math.round(Math.random() * answers.length)];
        addChatEntry(input, product);
        return true;
      }
      
      function scrollToBottom() {
        const messagesContainer = document.getElementById('messagesContainer');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
        
      function addChatEntry(input, product) {
        const messagesContainer = document.getElementById("messages");
        
        let userDiv = document.createElement("div");
        userDiv.id = "user";
        userDiv.className = "user-response";
        userDiv.innerHTML = `You: ${input}`;
        messagesContainer.appendChild(userDiv);
      
        let botDiv = document.createElement("div");
        let botText = document.createElement("span");
        botDiv.id = "bot";
        botDiv.className = "bot-response";
        botText.innerText = "Typing...";
        botDiv.appendChild(botText);
        messagesContainer.appendChild(botDiv);
      
        setTimeout(() => {
          botText.innerText = `Bot: ${product}`;
          loaded = true;
        }, 1000);
        
        scrollToBottom();
      }

      document.getElementById('bubble').style.display='none';
      setTimeout(function () {
      document.getElementById('bubble').style.display='block';
      }, 3000);

      setTimeout(function () {
        document.getElementById('bubble').style.display = 'block';
      }, 3000);

      setTimeout(function () {
        assistant.addEventListener('click', async event => {
          document.getElementById('bubble').style.display = 'none';
          teleportAssistant();
          count++;
          if (!clicked && remainingTeleports < 0) {
            clicked = true;
            await displayChatBox();
          }
        })
      }, 3000);

      speechBubble.addEventListener('click', function () {
        document.getElementById('root').style.display = 'none';
      });

      closeButton.addEventListener('click', function (event) {
        document.getElementById('bubble').style.display = 'none';
        loopTeleport();
        event.stopPropagation();
      });

    }
    
    function injectBootstrap() {
        const bootstrapCSS = document.createElement('link');
        bootstrapCSS.rel = 'stylesheet';
        bootstrapCSS.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'; // Replace with the desired Bootstrap version
    
        document.head.appendChild(bootstrapCSS);
    }

    function teleportAssistant() {
      const assistant = document.getElementById('root');
      if (count != 3 && remainingTeleports > 0) {
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;

          const newPositionX = Math.floor(Math.random() * (windowWidth - assistant.offsetWidth));
          const newPositionY = Math.floor(Math.random() * (windowHeight - assistant.offsetHeight));

          assistant.style.left = newPositionX + 'px';
          assistant.style.top = newPositionY + 'px';
          
      } else if (count == 3 || remainingTeleports == -1) {
          assistant.style.left = originalPosition.x + 'px';
          assistant.style.top = originalPosition.y + 'px';
          remainingTeleports = -1;
      } else {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const newPositionX = Math.floor(Math.random() * (windowWidth - assistant.offsetWidth));
        const newPositionY = Math.floor(Math.random() * (windowHeight - assistant.offsetHeight));

        assistant.style.left = newPositionX + 'px';
        assistant.style.top = newPositionY + 'px';
        
      }
    }

    function loopTeleport() {
      for (remainingTeleports; remainingTeleports > 0; remainingTeleports--) {
        setTimeout(function() {
          teleportAssistant();
        }, remainingTeleports * 800);
      }
    }

    window.addEventListener('load', function () {
        init();
    });
      
  }
};

let script = document.createElement('script');
script.type = 'text/javascript';
script.text = `(${app.toString()})()`;
script.init = function () {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(script);
