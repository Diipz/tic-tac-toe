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

    const aPlayer = createPlayer(playerOne, "X");
    const anotherPlayer = createPlayer(playerTwo, "O");
}

const createPlayer = (name, symbol) => {
    let container = document.querySelector(".container");
    let playerName = document.createElement("div");
    let marker = document.createElement("div");

    playerName.classList.add("player");
    marker.classList.add("player");

    playerName.innerHTML = name;
    marker.innerHTML = symbol;

    container.appendChild(playerName);
    container.appendChild(marker);
}
