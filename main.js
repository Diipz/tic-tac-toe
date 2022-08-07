const createPlayer = (name, symbol) => {
    //identify container and declare variables for player name & symbol to be inserted
    let container = document.querySelector(".container");
    let playerName = document.createElement("div");
    let marker = document.createElement("div");

    //add classes for css and toggle active player
    playerName.classList.add("player-name");
    playerName.classList.add("active-name");
    marker.classList.add("active");
    marker.classList.add("player-symbol");
    marker.classList.add("player");

    //preset "O" to go first
    if (symbol === "X") {
        playerName.classList.toggle("active-name");
        marker.classList.toggle("active");
    }

    //insert player name and symbol below title section
    playerName.innerHTML = name;
    marker.innerHTML = symbol;

    container.appendChild(playerName);
    container.appendChild(marker);

    return { name, symbol };
}

//Declare player names
const players = (() => {

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

    const firstPlayer = createPlayer(playerOne, "O");
    const secondPlayer = createPlayer(playerTwo, "X");

    return { firstPlayer, secondPlayer };
})();


const game = (() => {
    //starting point
    let remainingSpots = 9;
    let winnerDeclared = false;
    let activePlayer = players.firstPlayer;

    //selectors
    let subtext = document.querySelector("h2");

    //winning criteria
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function checkWinner() {
        winningCombinations.forEach(item => {
            if (gameBoard.board[item[0]] === activePlayer.symbol && gameBoard.board[item[1]] === activePlayer.symbol && gameBoard.board[item[2]] === activePlayer.symbol) {
                subtext.innerHTML = `${activePlayer.name} wins!!`;
                this.winnerDeclared = true;
            }
        })
    }

    function switchActivePlayer() {
        if (activePlayer === players.firstPlayer) {
            activePlayer = players.secondPlayer;
        }
        else {
            activePlayer = players.firstPlayer;
        }
    }

    function declareTieGame() {
        subtext.innerHTML = `Tie Game!!`;
    }

    return {
        remainingSpots,
        winnerDeclared,
        checkWinner,
        switchActivePlayer,
        declareTieGame
    };

})();

const gameBoard = (() => {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push("");
    }

    let boardLocation = document.querySelector("ul");

    let activePlayerName = document.querySelector(".active-name");
    let activePlayerSymbol = document.querySelector(".active");


    board.forEach((item, index) => {
        const square = document.createElement("li");
        square.setAttribute("draggable", "false");
        square.addEventListener("click", () => {
            activePlayerSymbol = document.querySelector(".active");
            activePlayerName = document.querySelector("active-name");

            //insert player symbol onto board
            square.innerHTML = activePlayerSymbol.innerHTML;

            //update array value to that of active player symbol
            board[index] = activePlayerSymbol.innerHTML;

            //update remainingSpots
            game.remainingSpots -= 1;

            //disable future onclick events
            square.style.pointerEvents = "none";

            //check for winner
            game.checkWinner();

            //switch active player
            game.switchActivePlayer();

            //check for tied game
            if (game.winnerDeclared == false && game.remainingSpots == 0) {
                game.declareTieGame();
            }

            //switch active player each click
            let activePlayerToggle = document.querySelectorAll(".player");
            Array.from(activePlayerToggle).forEach(item => {
                item.classList.toggle("active");
                item.classList.toggle("active-name");
            });

        });
        boardLocation.appendChild(square);

    });


    let squares = document.querySelectorAll("li");
    Array.from(squares).forEach(item => {
        item.addEventListener("click", () => {
            console.log(game.winnerDeclared);
            if (game.winnerDeclared == true) {
                Array.from(squares).forEach(element => {
                    element.style.pointerEvents = "none";
                })
            }
        })
    })

    return {
        activePlayerName,
        activePlayerSymbol,
        board
    };
})();
