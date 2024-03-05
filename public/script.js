const words = ['javascript', 'codigos', 'html', 'css', 'web', 'developer', 'computadora'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let hangmanImg = document.getElementById('hangman-img');
let wordContainer = document.getElementById('word');
let lettersContainer = document.getElementById('letters');
let messageContainer = document.getElementById('message');

function displayWord() {
  wordContainer.innerHTML = '';
  selectedWord.split('').forEach(letter => {
    let span = document.createElement('span');
    span.textContent = guessedLetters.includes(letter) ? letter : '_';
    wordContainer.appendChild(span);
  });
}

function displayLetters() {
  lettersContainer.innerHTML = guessedLetters.join(', ');
}

function displayHangman(step) {
  hangmanImg.src = `img/hangman${step}.png`;
}

function checkWin() {
  if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
    messageContainer.textContent = '¡Ganaste! ¿Quieres jugar de nuevo?';
    window.removeEventListener('keydown', handleKeydown);
  }
}

function checkLose() {
  if (selectedWord.split('').some(letter => !guessedLetters.includes(letter))) {
    messageContainer.textContent = '¡Perdiste! La palabra correcta era: ' + selectedWord + '. ¿Quieres intentarlo de nuevo?';
    window.removeEventListener('keydown', handleKeydown);
  }
}


function handleKeydown(event) {
  let letter = event.key.toLowerCase();
  if (/^[a-z]$/.test(letter) && !guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    displayLetters();
    if (!selectedWord.includes(letter)) {
      displayHangman(guessedLetters.length);
      checkLose();
    } else {
      displayWord();
      checkWin();
    }
  }
}

function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  displayWord();
  displayLetters();
  displayHangman(0);
  messageContainer.textContent = '';
  window.addEventListener('keydown', handleKeydown);
}

resetGame();
