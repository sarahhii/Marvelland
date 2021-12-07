//all memory cards
const cards = $('.memory-card').get();

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//flips the cards
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    $(this).addClass('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    //second click checks for match
    secondCard = this;
    checkForMatch();
}
//matching the two cards that belong together building a pair by dataset and framework
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

//function that makes correct pairs stay unflipped. The function removes the flipCard-function from them
function disableCards() {
    $(firstCard).off('click', flipCard);
    $(secondCard).off('click', flipCard);

    resetBoard();
}

//unflipping the cards and helping lags when cards are getting flipped too fast 
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        $(firstCard).removeClass('flip');
        $(secondCard).removeClass('flip');

        resetBoard();
    }, 1500);
}

//if two chosen cards dont match, cards will be flipped back around
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//re-sort the cards randomly
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 18);
        card.style.order = randomPos;
    });
})();

//for each card the "click-event" is added. When clicked on the flipCard-func runs
$(cards).each(function () {
    $(this).on('click', flipCard)
});



//when clicked on start-again-button the page is  reloaded.
$('#startagain').on('click', function () {
    location.reload(true);
});
