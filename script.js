if (localStorage.length == 0) {
  localStorage.setItem("highScore", 0);
} else {
  highScore.innerHTML = `High Score:${localStorage.getItem("highScore")}`;
}
let guessed = 0
let showedButtonsArr = []
let countOfLetters = 0
let arr;
let alphabetStatus = true;
let alphabetCheck = 0;
let win = false;
let backCheck = false;
let score = 0;
let playButtonStatus = false;
let music = true;
let status = true;
let alphabetWinCheck = false;
// musicButton.addEventListener('click', function () {
//     if (music) {
//         music = false;
//     } else {
//         music = true;
//     }

//     if (music) {
//         volumeIcon.innerHTML = "volume_up";
//     } else {
//         volumeIcon.innerHTML = "volume_off";
//     }
// });
statusButton.addEventListener("click", function () {
  if (status) {
    status = false;
  } else {
    status = true;
  }

  if (status) {
    statusIcon.innerHTML = "play_circle";
    title.classList.add("animation");
    chooseH2.classList.add("animation");
    playButton.classList.add("btnAnimation");
    typing.classList.add("btnAnimation");
    back.classList.add("btnAnimation");
    mouse.classList.add("btnAnimation")
    help.classList.add("btnAnimation");
    alphabet.classList.add("btnAnimation");
    memoryGame.classList.add("btnAnimation");
  } else {
    statusIcon.innerHTML = "stop_circle";
    title.classList.remove("animation");
    chooseH2.classList.remove("animation");
    playButton.classList.remove("btnAnimation");
    typing.classList.remove("btnAnimation");
    back.classList.remove("btnAnimation");
    mouse.classList.remove("btnAnimation")
    help.classList.remove("btnAnimation");
    alphabet.classList.remove("btnAnimation");
    memoryGame.classList.remove("btnAnimation");
  }
});
playLink.addEventListener("click", function () {
  homePage.classList.add("hide");
  choosePage.classList.remove("hide");
});
memoryGame.addEventListener("click", function () {
  choosePage.classList.add("hide")
  memoryGamePage.classList.remove("hide")
  memoryGameH2.classList.add("hide")
  createMemoryGame(armenianAlphabet)
})
memoryBack.addEventListener("click", () => {
  choosePage.classList.remove("hide")
  memoryGamePage.classList.add("hide")
  while (gamePage.firstChild) {
    gamePage.removeChild(gamePage.firstChild);
  }
})
typing.addEventListener("click", function () {
  backCheck = false;
  timer.innerText = "10";
  choosePage.classList.add("hide");
  typingPage.classList.remove("hide");
  count.classList.remove("hide");
  word.classList.remove("hide");
  input.classList.remove("hide");
  timer.classList.remove("hide");
  scoreH2.classList.remove("hide");
  highScore.classList.remove("hide");
  result.classList.add("hide");
  backCount();
  word.innerHTML = randomItem(words);
  input.addEventListener("input", newWord);
  typingBack.addEventListener("click", () => {
    backCheck = true;
    count.innerText = "3";
    choosePage.classList.remove("hide");
    typingPage.classList.add("hide");
    typingGame.classList.add("hide");
    input.value = "";
    input.removeEventListener("input", newWord);
  });
});
mouse.addEventListener('click', function () {
  choosePage.classList.add("hide")
  aimPage.classList.remove("hide")
  dot.addEventListener("click", generateNewCordinates)
})
mouseBack.addEventListener('click', function () {
  choosePage.classList.remove("hide")
  aimPage.classList.add("hide")
  dot.removeEventListener("click", generateNewCordinates)
  guessed = 0
  showedButtonsArr = []
  countOfLetters = 0
})
help.addEventListener("click", function () {
  choosePage.classList.add("hide");
  helpPage.classList.remove("hide");
  let key = chooseLetter();
  function game(a) {
    console.log(a.key.toUpperCase());
    if (key == a.key.toUpperCase()) {
      audioElement.play();
      let keyId = `key${key}`;
      document.getElementById(keyId).classList.remove("selected");
      key = chooseLetter();
    } else {
      audioElement.play();
      let keyId = `key${a.key.toUpperCase()}`;
      document.getElementById(keyId).classList.add("hit");
      setTimeout(() => {
        document.getElementById(keyId).classList.remove("hit");
      }, 500);
    }
  }
  document.addEventListener("keyup", game);
  helpBack.addEventListener("click", function () {
    choosePage.classList.remove("hide");
    helpPage.classList.add("hide");
    for (let i = 0; i < lettersID.length; i++) {
      let keyId = `key${lettersID[i]}`;
      document.getElementById(keyId).classList.remove("selected");
    }
    document.removeEventListener("keyup", game);
  });
});
back.addEventListener("click", function () {
  homePage.classList.remove("hide");
  choosePage.classList.add("hide");
});
alphabet.addEventListener("click", function () {
  buttonsContainer.style = "";
  buttonsContainer.classList.remove("hide");
  loseAlert.classList.add("hide");
  winAlert.classList.add("hide");

  alphabetTimer.classList.remove("hide");
  choosePage.classList.add("hide");
  alphabetPage.classList.remove("hide");
  alphabetStatus = true;
  alphabetTimerF();
  arr = shuffleArray(armenianAlphabet);
  createButtons(arr);
  backAlphabet.addEventListener("click", function () {
    alphabetStatus = false;
    alphabetWinCheck = false;
    choosePage.classList.remove("hide");
    alphabetPage.classList.add("hide");
    arr = shuffleArray(armenianAlphabet);
    alphabetCheck = 0;
    while (buttonsContainer.firstChild) {
      buttonsContainer.removeChild(buttonsContainer.firstChild);
    }
  });
});
function randomItem(arr) {
  let random = Math.floor(Math.random() * arr.length);
  return arr[random];
}
function chooseLetter() {
  let keyName = randomItem(lettersID);
  let keyId = `key${keyName}`;
  document.getElementById(keyId).classList.add("selected");
  return keyName;
}
function backCount() {
  let game = setInterval(() => {
    count.innerText--;
    if (count.innerText == 0) {
      count.classList.add("hide");
      typingGame.classList.remove("hide");
      timerF();
      clearInterval(game);
    }
  }, 1000);
}
function timerF() {
  timer.innerText = 10;
  let game = setInterval(() => {
    timer.innerText--;
    if (timer.innerText <= 0) {
      count.classList.add("hide");
      word.classList.add("hide");
      input.classList.add("hide");
      timer.classList.add("hide");
      scoreH2.classList.add("hide");
      highScore.classList.add("hide");
      result.classList.remove("hide");
      if (win) {
        result.innerHTML = `New High Score : ${score}`;
      } else {
        result.innerHTML = `Try Again`;
      }
      score = 0;
      scoreH2.innerHTML = `Your Score:${score}`;
      win = false;
      clearInterval(game);
    } else if (backCheck) {
      clearInterval(game);
    }
  }, 1000);
}
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function newWord() {
  if (input.value == word.innerHTML) {
    score++;
    if (score > localStorage.getItem("highScore")) {
      localStorage.setItem("highScore", score.toString());
      win = true;
      highScore.innerHTML = `High Score:${localStorage.getItem("highScore")}`;
    }
    timer.innerHTML = 10;
    scoreH2.innerHTML = `Your Score:${score}`;
    input.value = "";
    word.innerHTML = randomItem(words);
  }
}

function shuffleArray(arr) {
  const shuffledArr = arr.slice();
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
  return shuffledArr;
}
function alphabetTimerF() {
  alphabetTimer.innerText = "120";
  let game = setInterval(() => {
    alphabetTimer.innerText--;
    if (!alphabetStatus) {
      clearInterval(game);
    } else if (alphabetTimer.innerText == 0) {
      buttonsContainer.style = "display:none;";
      alphabetTimer.classList.add("hide");
      loseAlert.classList.remove("hide");
      clearInterval(game);
    } else if (alphabetWinCheck) {
      winAlert.classList.remove("hide");
      buttonsContainer.style = "display:none;";
      alphabetTimer.classList.add("hide");
      clearInterval(game);
    }
  }, 1000);
}
function createButtons(itemsArray) {
  for (let i = 0; i < itemsArray.length; i++) {
    let item = itemsArray[i];
    let createdButton = document.createElement("button");
    createdButton.textContent = item;
    createdButton.addEventListener("click", function () {
      if (item === armenianAlphabet[alphabetCheck]) {
        this.style = "background:green;";
        alphabetCheck++;
        this.disabled = true
        if (alphabetCheck === armenianAlphabet.length) {
          alphabetWinCheck = true;
          // alphabetTimer.innerText="120"
          // arr=shuffleArray(armenianAlphabet)
          // alphabetCheck=0
          while (buttonsContainer.firstChild) {
            buttonsContainer.removeChild(buttonsContainer.firstChild);
          }
        }
      } else if (item !== armenianAlphabet[alphabetCheck]) {
        this.style = "background:red;";
        setTimeout(() => {
          this.style = "";
        }, 500);
      }
    });
    buttonsContainer.appendChild(createdButton);
  }
}
function generateNewCordinates() {
  dot.style = `margin-top:${Math.floor(Math.random() * 500)}px;
  margin-bottom:${Math.floor(Math.random() * 500)}px;
  margin-right:${Math.floor(Math.random() * 500)}px;
  margin-left:${Math.floor(Math.random() * 500)}px`
}
function createMemoryGame(items) {
  const gamePage = document.getElementById('gamePage');
  const shuffledItems = shuffleArray([...items, ...items]);
  shuffledItems.forEach(item => {
    const button = document.createElement('button');
    button.textContent = item;
    button.addEventListener("click", () => {
      button.disabled = true
      button.style = "color:white"
      countOfLetters++
      showedButtonsArr.push(button)
      if (countOfLetters == 2) {
        if (showedButtonsArr[0].innerHTML == showedButtonsArr[1].innerHTML) {
          guessed++
          setTimeout(() => {
            showedButtonsArr[0].classList.add("hide")
            showedButtonsArr[1].classList.add("hide")
            showedButtonsArr = []
            countOfLetters = 0
          }, 80)
          if (guessed == 39) {
            memoryGameH2.classList.remove("hide")
          }
        } else {
          setTimeout(() => {
            showedButtonsArr[1].disabled = false
            showedButtonsArr[0].disabled = false
            showedButtonsArr[0].style = "color:transperent"
            showedButtonsArr[1].style = "color:transperent"
            showedButtonsArr = []
            countOfLetters = 0

          }, 80)
        }
      }
    })
    gamePage.appendChild(button);
  });
}
