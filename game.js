
let pictures = ["./img/card1.jpg", "./img/card1.jpg",
    "./img/card2.jpg", "./img/card2.jpg",
    "./img/card3.jpg", "./img/card3.jpg",
    "./img/card4.jpg", "./img/card4.jpg",
    "./img/card5.jpg", "./img/card5.jpg",
    "./img/card6.jpg", "./img/card6.jpg",
    "./img/card7.jpg", "./img/card7.jpg",
    "./img/card8.jpg", "./img/card8.jpg",
    "./img/card9.jpg", "./img/card9.jpg",
    "./img/card10.jpg", "./img/card10.jpg",
    "./img/card11.jpg", "./img/card11.jpg",
    "./img/card12.jpg", "./img/card12.jpg",
    "./img/card13.jpg", "./img/card13.jpg",
    "./img/card14.jpg", "./img/card14.jpg",
    "./img/card15.jpg", "./img/card15.jpg",
    "./img/card16.jpg", "./img/card16.jpg",
    "./img/card17.jpg", "./img/card17.jpg",
    "./img/card18.jpg", "./img/card18.jpg",
    "./img/card19.jpg", "./img/card19.jpg",
    "./img/card20.jpg", "./img/card20.jpg"
];

let numberOfFlippedCards = 0;
let numberOfRemainingPairs;
let flippedCards = document.querySelector("#flips");
let remainingPairs = document.querySelector("#remaining-pairs");
let timer;
let time = document.querySelector("#time");
let levelDiv = document.querySelector("#level-div");
let welcomeDiv = document.querySelector("#welcome");
let gameOverDiv = document.querySelector("#game-over");
let startGame = document.querySelector("#start-game");
let newGame = document.querySelector("#new-game");
let nameInput = document.querySelector("#name");
let userName;
let level;
let levelSelect = document.querySelector("#level");

firstInit();

levelSelect.addEventListener("change", function () {
    switch (levelSelect.value) {
        case "demo":
            numberOfRemainingPairs = 3;
            remainingPairs.innerHTML = numberOfRemainingPairs;
            level = "Demo";
            initGame(pictures.slice(0, 6), "demo");
            break;
        case "easy":
            numberOfRemainingPairs = 9;
            remainingPairs.innerHTML = numberOfRemainingPairs;
            level = "Easy";
            initGame(pictures.slice(0, 18), "easy");
            break;
        case "medium":
            numberOfRemainingPairs = 14;
            remainingPairs.innerHTML = numberOfRemainingPairs;
            level = "Medium";
            initGame(pictures.slice(0, 28), "medium");
            break;
        case "hard":
            numberOfRemainingPairs = 20;
            remainingPairs.innerHTML = numberOfRemainingPairs;
            level = "Medium";
            initGame(pictures, "hard");
    }
});

startGame.addEventListener("click", function () {
    welcomeDiv.style.display = "none";
    firstInit();
    userName = nameInput.value;
    level = "Demo";
});
newGame.addEventListener("click", function () {
    gameOverDiv.style.display = "none";
    firstInit();
});




function firstInit() {
    initGame(pictures.slice(0, 6), "demo");
    levelSelect.firstElementChild.selected = true;
    numberOfRemainingPairs = 3;
    remainingPairs.innerHTML = numberOfRemainingPairs;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function cardEventListener() {
    let cards = document.querySelectorAll(".card");
    let selectedCards = [];
    for (let card of cards) {
        card.addEventListener("click", function () {
            if (selectedCards.length < 2 && this.firstElementChild.src.includes("binary.jpg")) {
                selectedCards.push(card);
                numberOfFlippedCards++;
                flippedCards.innerHTML = numberOfFlippedCards;
                if (numberOfFlippedCards == 1) {
                    timeStart();
                }
                let img = card.firstElementChild;
                img.src = card.id;
                if (selectedCards.length == 2) {
                    if (!(selectedCards[0].id == selectedCards[1].id)) {
                        setTimeout(function () {
                            selectedCards[0].firstElementChild.src = "./img/binary.jpg";
                            selectedCards[1].firstElementChild.src = "./img/binary.jpg";
                            selectedCards = [];
                        }, 1500);
                    } else {
                        numberOfRemainingPairs--;
                        remainingPairs.innerHTML = numberOfRemainingPairs;
                        selectedCards = [];
                        if (numberOfRemainingPairs == 0) {
                            gameOver();
                        }
                    }
                }
            }
        });
    }
}

function initGame(picturesArr, sizeClass) {
    shuffle(picturesArr);
    numberOfFlippedCards = 0;
    flippedCards.innerHTML = numberOfFlippedCards;
    createBoard(picturesArr, sizeClass);
    cardEventListener();
    timeStop();
    time.innerHTML = "0:00";
}

function createBoard(imgArray, sizeClass) {
    let mainContainer = document.querySelector(".main-container");
    mainContainer.innerHTML = "";
    for (let imgSrc of imgArray) {
        createCard(imgSrc, sizeClass);
    }
}

function createCard(id, sizeClass) {
    let mainContainer = document.querySelector(".main-container");
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.classList.add(sizeClass);
    card.setAttribute("id", id);
    mainContainer.appendChild(card);
    let img = document.createElement("img");
    img.setAttribute("src", "./img/binary.jpg");
    card.appendChild(img);
}

function timeStart() {
    let seconds = 0;
    let minutes = 0;
    timer = setInterval(function() {
        seconds++;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (seconds > 59) {
            minutes++;
            seconds = "00";
        }
        let clockFace = minutes + ":" + seconds
        time.innerHTML = clockFace;
    }, 1000);
}

function timeStop() {
    clearInterval(timer);
}

function gameOver() {
    let timeGameOver = document.querySelector("#time-game-over");
    let flipsGameOver = document.querySelector("#flips-game-over");
    let nameGameOver = document.querySelector("#name-game-over");
    gameOverDiv.style.display = "flex";
    timeGameOver.innerHTML = time.innerHTML;
    flipsGameOver.innerHTML = flippedCards.innerHTML;
    if (userName != "") {
        nameGameOver.innerHTML = userName;
    } else {
        nameGameOver.innerHTML = "Stranger";
    }
    levelDiv.innerHTML = level;
    timeStop();
}
