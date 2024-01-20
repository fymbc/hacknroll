function app() {
  function init() {
      const assistant = document.createElement('div');
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
        
        document.getElementById('bubble').style.display='none';
        
        setTimeout(function () {
        document.getElementById('bubble').style.display='block';
        }, 3000);
    }
    window.addEventListener('load', init);
}

async function shift() {
  if (position.x < 40 || position.x > window.innerWidth - 40 || position.y < 40 || position.y > window.innerHeight + 40) {

}

async function animateTeleport(x, y) {
  await animateClass('disappear');
  pet.style.opacity = 0;
  updatePosition(x, y);
  pet.style.opacity = 100;
  await animateClass('reappear');
}


let script = document.createElement('script');
script.type = 'text/javascript';
script.text = `(${app.toString()})()`;
script.init = function() {
  this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(script);
