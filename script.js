// audio
let clickAudio = new Audio('audio/click.wav');
let matchAudio = new Audio('audio/match.wav');
let winAudio = new Audio('audio/win.wav');

function createNewCard() {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML =
    `<div class="card-down"></div>
     <div class="card-up"></div>`;
  return cardElement;
}

function appendNewCard(parentElement) {
  let cardElement = createNewCard();
  parentElement.appendChild(cardElement);
  return cardElement;
}

function shuffleCardImageClasses() {
  let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];
  return _.shuffle(cardClasses);
}

function createCards(parentElement, shuffledImageClasses) {
  let cardObject = [];
  
  for (let i = 0; i < 12; i++) {
    var newCard = appendNewCard(parentElement);
      newCard.classList.add(shuffledImageClasses[i]);
    var customCardObject = {
      index: i,
      element: newCard,
      imageClass: shuffledImageClasses[i]
    }
    cardObject.push(customCardObject);
  }
  return cardObject;
}

function doCardsMatch(cardObject1, cardObject2) {
  if (cardObject1.imageClass == cardObject2.imageClass) {
    return true;
  } else {
    return false;
  }
}

let counters = {};


function incrementCounter(counterName, parentElement) {
  if (counters[counterName] == undefined) {
    counters[counterName] = 0;
} 
  counters[counterName]++;
  parentElement.innerHTML = counters[counterName];
}

let lastCardFlipped = null;

function onCardFlipped(newlyFlippedCard) {
  incrementCounter("flips", document.getElementById("flip-count"));
    if (lastCardFlipped == null) {
      lastCardFlipped = newlyFlippedCard;
      return;
    } 
    if (doCardsMatch(newlyFlippedCard, lastCardFlipped) == false) {
      newlyFlippedCard.element.classList.remove("flipped");
      lastCardFlipped.element.classList.remove("flipped");
      lastCardFlipped = null;
      return;
    }

  incrementCounter("matches", document.getElementById("match-count"))
      newlyFlippedCard.element.classList.add("border-glow");
      lastCardFlipped.element.classList.add("border-glow");
    if (counters["matches"] == 6) {
      winAudio.play();
    } else {
      matchAudio.play();
    }
  lastCardFlipped = null;
}

// setTimeout
function flipCardWhenClicked(cardObject) {
  cardObject.element.onclick = function() {
    if (cardObject.element.classList.contains("flipped")) {
      return;
    }
    clickAudio.play();
    cardObject.element.classList.add("flipped");
    setTimeout(function() {
      onCardFlipped(cardObject);
    }, 1000);
  };
}

let cardObjects =
  createCards(document.getElementById("card-container"), shuffleCardImageClasses());

if (cardObjects != null) {
  for (let i = 0; i < cardObjects.length; i++) {
    flipCardWhenClicked(cardObjects[i]);
  }
}

// function endGame() {
//   let endGameButton = document.createElement("div");
//   let gameContainer = document.getElementById("game-container");
//   endGameButton.innerHTML = `<button type="button" class="btn btn-outline-success restart-btn" onclick="location.reload()">Play Again?</button>`;
//   endGameButton.classList.add("end-game");
//   gameContainer.appendChild(endGameButton);
// }