//Declare player names//
window.onload = () => {

    let playerOne;
    let playerTwo;

    function generatePlayerOneName() {
        playerOne = window.prompt("Player 1 enter your name: ");

        if (playerOne === "") {
            alert("Player 1 must enter a name");
            generatePlayerOneName();
        }
        else if (playerOne.length > 7) {
            alert("Player 1 name must be less than 8 characters");
            generatePlayerOneName();
        }
    }

    function generatePlayerTwoName() {
        playerTwo = window.prompt("Player 2 enter your name: ");

        if (playerTwo === "") {
            alert("Player 2 must enter a name");
            generatePlayerTwoName();
        }
        else if (playerTwo.length > 7) {
            alert("Player 2 name must be less than 8 characters");
            generatePlayerTwoName();
        }
    }

    generatePlayerOneName();
    generatePlayerTwoName();

    const aPlayer = createPlayer(playerOne, "O");
    const anotherPlayer = createPlayer(playerTwo, "X");
}

const createPlayer = (name, symbol) => {
    let container = document.querySelector(".container");
    let playerName = document.createElement("div");
    let marker = document.createElement("div");

    playerName.classList.add("player-name");
    marker.classList.add("player-symbol");
    marker.classList.add("active");
    marker.classList.add("player");

    11

    //preset "O" to go first//
    if (symbol === "X") {
        marker.classList.toggle("active");
    }

    playerName.innerHTML = name;
    marker.innerHTML = symbol;

    container.appendChild(playerName);
    container.appendChild(marker);
}

const gameBoard = (() => {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push("");
    }

    let boardLocation = document.querySelector("ul")
    board.forEach(element => {
        const square = document.createElement("li");
        square.setAttribute("draggable", "false");
        square.addEventListener("click", () => {
            let activePlayer = document.querySelector(".active");
            square.innerHTML = activePlayer.innerHTML;

            //disable future onclick enents//
            square.style.pointerEvents = "none";

            let activePlayerToggle = document.querySelectorAll(".player");
            Array.from(activePlayerToggle).forEach((item) => {
                item.classList.toggle("active");
            });
        });
        boardLocation.appendChild(square);

    });

})();
