let player = {
    name: "anyName" ,
    credits: 0
} 

let sum = 0;
let cards = []; // create array of cards - empty before the start of game

let hasBlackJack = false;
let isAlive = false;

let message = "";

let messageEl = document.getElementById("message-to-play");
let sumEl = document.getElementById("Sum-El");
let cardEl = document.getElementById("Card-El");

let playerCredits = document.getElementById("user-credits");
playerCredits.textContent = player.name + " : " + "$" + player.credits;


 
function renderGame() {
      if(sum < 21) {
      message = "Do you want to draw another card?";
    } else if(sum === 21) {
      message = "you got the blackjack!";
      hasBlackJack = true;
    } else {
      message = "You're out of game!";
      isAlive = false;
    }
   
   messageEl.textContent = message;
   sumEl.textContent = "Sum: " + sum;
   cardEl.textContent  = "Cards: "; 
      // using for loop to render out any numbers of card 
          for (let i = 0; i < cards.length; i++) {
            cardEl.textContent += cards[i] + " ";
          }
}

const betAmount = 50;

function startGame() {
    if (player.credits < betAmount) {
        messageEl.textContent = "You don't have enough chips.";
        return;
    }

    isAlive = true;
    hasBlackJack = false;
    player.credits -= betAmount;
    updateCreditsDisplay();

    let card1 = getRandomNumber();
    let card2 = getRandomNumber();

    sum = card1 + card2;
    cards = [card1, card2];

    renderGame();
}

function updateCreditsDisplay() {
    playerCredits.textContent = player.name + " : $" + player.credits;
}


function runNewCard() {
  if (isAlive === true && hasBlackJack === false) {
  let card3 = getRandomNumber();
  sum += card3; 
  cards.push(card3); // push that third card to the existing array of cards
  renderGame(); 
  }  
}

function getRandomNumber() {
  randomNumber = Math.floor(Math.random() * 13) + 1; // range 1:13 
    if (randomNumber > 10){
      return 10
    } else if (randomNumber === 1) {
      return 11
    } else 
      return randomNumber
}

function initializePlayer() {
    const nameInput = document.getElementById("player-name").value;
    const creditsInput = parseInt(document.getElementById("player-credits").value);

    if (!nameInput || isNaN(creditsInput) || creditsInput <= 0) {
        alert("Put in a real name and real chips, rookie.");
        return;
    }

    player.name = nameInput;
    player.credits = creditsInput;

    updateCreditsDisplay();

    // hide the setup form
     document.getElementById("player-setup").style.display = "none";
     document.getElementById("container").style.display = "block";

}

