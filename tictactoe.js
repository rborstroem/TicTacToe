var topLeftElement = document.getElementById("top_left");
var topCenterElement = document.getElementById("top_center");
var topRightElement = document.getElementById("top_right");
var centerLeftElement = document.getElementById("center_left");
var centerCenterElement = document.getElementById("center_center");
var centerRightElement = document.getElementById("center_right");
var bottomLeftElement = document.getElementById("bottom_left");
var bottomCenterElement = document.getElementById("bottom_center");
var bottomRightElement = document.getElementById("bottom_right");

var restartElement = document.getElementById("restart");
var turnTextElement = document.getElementById("turnText");

var turn = 0;
var playerWon = false;

var valueArray = new Array(9).fill("NULL");
var boolArray = new Array(9).fill(true);
var elementArray = [topLeftElement, topCenterElement, topRightElement, centerLeftElement, centerCenterElement, centerRightElement, bottomLeftElement, bottomCenterElement, bottomRightElement];

// TOP ELEMENTS CLICK EVENT LISTENERS
$(topLeftElement).click(function() {
    if (boolArray[0]) {
        insertValue(topLeftElement, turn, 0);
        boolArray[0] = false;
        turn++;
    }
});

$(topCenterElement).click(function() {
    if (boolArray[1]) {
        insertValue(topCenterElement, turn, 1);
        boolArray[1] = false;
        turn++;
    }
});

$(topRightElement).click(function() {
    if (boolArray[2]) {
        insertValue(topRightElement, turn, 2);
        boolArray[2] = false;
        turn++;
    }
});

// CENTER ELEMENTS CLICK EVENT LISTENERS
$(centerLeftElement).click(function() {
    if (boolArray[3]) {
        insertValue(centerLeftElement, turn, 3);
        boolArray[3] = false;
        turn++;
    }
});

$(centerCenterElement).click(function() {
    if (boolArray[4]) {
        insertValue(centerCenterElement, turn, 4);
        boolArray[4] = false;
        turn++;
    }
});

$(centerRightElement).click(function() {
    if (boolArray[5]) {
        insertValue(centerRightElement, turn, 5);
        boolArray[5] = false;
        turn++;
    }
});

// BOTTOM ELEMENTS CLICK EVENT LISTENERS
$(bottomLeftElement).click(function() {
    if (boolArray[6]) {
        insertValue(bottomLeftElement, turn, 6);
        boolArray[6] = false;
        turn++;
    }
});

$(bottomCenterElement).click(function() {
    if (boolArray[7]) {
        insertValue(bottomCenterElement, turn, 7);
        boolArray[7] = false;
        turn++;
    }
});

$(bottomRightElement).click(function() {
    if (boolArray[8]) {
        insertValue(bottomRightElement, turn, 8);
        boolArray[8] = false;
        turn++;
    }
});

// restarts game
$(restart).click(function() {
    resetValues();
});


// Writes to cell to give X or O
function insertValue(element, turn, index) {
    if (turn % 2 == 0) {
        element.innerHTML = 'X';
        turnTextElement.innerHTML = 'X\'s turn!'
    } else {
        element.innerHTML = 'O';
        turnTextElement.innerHTML = 'O\'s turn!'
    }

    valueArray[index] = element.innerHTML;
    
    endGameCheck();
}

function resetValues() {
    turn = 0;
    playerWon = false;

    turnTextElement.innerHTML = 'X\'s turn!'

    setAllClickable(true);

    for (var i = 0; i < elementArray.length; i++) {
        elementArray[i].innerHTML = "";
        elementArray[i].style.backgroundColor = "whitesmoke";
        valueArray[i] = "NULL";
    }

    location.reload();
}

function endGameCheck() {
    if (!playerWon && turn % 2 == 0) {
        winCondition("X");
    } else if (!playerWon && turn % 2 == 1) {
        winCondition("O");
    }

    if (turn == 8 && !playerWon) {
        gameOver();
    }
}

// Needs to be cleaned!
function winCondition(string) {
    if (valueArray[0] == string) {
        if (valueArray[1] == string && valueArray[2] == string) {
            win(string);
            colorize(0, 1, 2);
            return;
        } else if (valueArray[3] == string && valueArray[6] == string) {
            win(string);
            colorize(0, 3, 6);
            return;
        } else if (valueArray[4] == string && valueArray[8] == string) {
            win(string);
            colorize(0, 4, 8);
            return;
        }
    }
    if (valueArray[1] == string && valueArray[4] == string && valueArray[7] == string) {
        win(string);
        colorize(1,4,7);
        return;
    }
    if (valueArray[2] == string) {
        if (valueArray[5] == string && valueArray[8] == string) {
            win(string);
            colorize(2, 5, 8);
            return;
        } else if (valueArray[4] == string && valueArray[6] == string) {
            win(string);
            colorize(2, 4, 6);
            return;
        }
    }
    if (valueArray[3] == string && valueArray[4] == string && valueArray[5] == string) {
        win(string);
        colorize(3, 4, 5);
        return;
    } 
    if (valueArray[6] == string && valueArray[7] == string && valueArray[8] == string) {
        win(string);
        colorize(6, 7, 8);
        return;
    }
}

function gameOver() {
    for (var i = 0; i < elementArray.length; i++) {
        elementArray[i].style.backgroundColor = "dimgray";
    }
    
    turnTextElement.innerHTML = "Game Over - No winner!"
}

function setAllClickable(bool) {
    for (var i = 0; i < boolArray.length; i++) {
        boolArray[i] = bool;
    }
}

function win(string) {
    turnTextElement.innerHTML = "Player " + string + " has won!";
    setAllClickable(false);
    playerWon = true;
}

function colorize(int1, int2, int3) {
    for (var i = 0; i < elementArray.length; i++) {
        if (i == int1 || i == int2 || i == int3) {
            elementArray[i].style.backgroundColor = "gold";
        } else {
            elementArray[i].style.backgroundColor = "dimgray";
        }
    }
}
