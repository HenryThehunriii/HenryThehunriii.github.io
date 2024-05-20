const symbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍍'];
const totalCards = symbols.length * 2;
const gameGrid = document.getElementById('image-grid');
let timerInterval;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milSec = 0;
let flippedCards = [];
let matchedCards = 0;

const cards = [];

for (let i = 0; i < totalCards / 2; i++)
{
    cards.push(createCard(symbols[i]));
    cards.push(createCard(symbols[i]));
}
shuffle(cards);

cards.forEach(function(card)
{
    gameGrid.appendChild(card);
});

cards.forEach(function(card)
{
    card.addEventListener('click', function()
    {
        if (!card.classList.contains('flipped') && flippedCards.length < 2)
        {
            flipCard(card);
            flippedCards.push(card);

            if (flippedCards.length === 2)
            {
                setTimeout(checkMatch, 250);
            }
        }
    });
});

function createCard(symbol)
{
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = symbol;
    return card;
}

function shuffle(array)
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard(card)
{
    card.classList.add('flipped');
}

function checkMatch()
{
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.innerHTML === secondCard.innerHTML)
    {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards += 2;

        if (matchedCards === totalCards)
        {
            clearInterval(timerInterval);
            setTimeout(function()
            {
                if(minutes==0){
                    alert('Congratulations! You matched all the cards in under 1 minute!');
                }
                else{
                    alert("You took more that one minute, you lost")
                }
            },500)
}
        }
    
    else
    {
        setTimeout(function()
        {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 250);
    }
    flippedCards = [];
}
function startTimer() {
    console.log('Starting')
    timerInterval = setInterval(updateTime, 1);
}
function updateTime(){
    console.log("count")
milSec++
milSec = (milSec<10)? '0'+milSec:milSec

if(milSec >=100)
{
    milSec = 0;
    seconds++
    seconds = (seconds<10)? '0'+ seconds : seconds;
    if (seconds >= 60) {
    seconds = 0;
    
    minutes++;
    minutes = (minutes<10)? '0'+ minutes : minutes;
if (minutes >= 60) {
        minutes = 0;
        hours++;
        hours = (hours<10)? '0'+ hours : hours;
    }
}}



if (hours==0) {hours = "00"}
if (minutes==0) {minutes = "00"}
if (seconds==0) {seconds = "00"}
document.getElementById("hour").innerHTML = hours;
document.getElementById("min").innerHTML = minutes;
document.getElementById("sec").innerHTML = seconds;
document.getElementById("milsec").innerHTML = milSec;

}
startTimer();
console.log("hi")
