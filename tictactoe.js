
var topLeftClickable = true;
var topCenterClickable = true;
var topRightClickable = true;

var centerLeftClickable = true;
var centerCenterClickable = true;
var centerRightClickable = true;

var bottomLeftClickable = true;
var bottomCenterClickable = true;
var bottomRightClickable = true;


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

var valueArray = ["NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL","NULL"];
var elementArray = [topLeftElement, topCenterElement, topRightElement, centerLeftElement, centerCenterElement, centerRightElement, bottomLeftElement, bottomCenterElement, bottomRightElement];

var playerWon = false;

var plays = 0;

// TOP ELEMENTS CLICK EVENT LISTENERS
$(topLeftElement).click(function() {
    if (topLeftClickable) {
        insertValue(topLeftElement, turn, 0);
        topLeftClickable = false;
        turn = changeTurn(turn);
        changeTurnText(turn);
    }
});

$(topCenterElement).click(function() {
    if (topCenterClickable) {
        insertValue(topCenterElement, turn, 1);
        topCenterClickable = false;
        turn = changeTurn(turn);
        changeTurnText(turn);
    }
});

$(topRightElement).click(function() {
    if (topRightClickable) {
        insertValue(topRightElement, turn, 2);
        topRightClickable = false;
        turn = changeTurn(turn);
        changeTurnText(turn);
    }
});

// CENTER ELEMENTS CLICK EVENT LISTENERS
$(centerLeftElement).click(function() {
    if (centerLeftClickable) {
        insertValue(centerLeftElement, turn, 3);
        centerLeftClickable = false;
        turn = changeTurn(turn);
        changeTurnText(turn);
    }
});

$(centerCenterElement).click(function() {
    if (centerCenterClickable) {
        insertValue(centerCenterElement, turn, 4);
        centerCenterClickable = false;
        turn = changeTurn(turn);
        changeTurnText(turn);
    }
});

$(centerRightElement).click(function() {
    if (centerRightClickable) {
        insertValue(centerRightElement, turn, 5);
        centerRightClickable = false;
        turn = changeTurn(turn);
        changeTurnText(turn);
    }
});

// BOTTOM ELEMENTS CLICK EVENT LISTENERS
$(bottomLeftElement).click(function() {
    if (bottomLeftClickable) {
        insertValue(bottomLeftElement, turn, 6);
        bottomLeftClickable = false;
        turn = changeTurn(turn);
        changeTurnText(turn);
    }
});

$(bottomCenterElement).click(function() {
    if (bottomCenterClickable) {
        insertValue(bottomCenterElement, turn, 7);
        bottomCenterClickable = false;
        turn = changeTurn(turn);
        changeTurnText(turn);
    }
});

$(bottomRightElement).click(function() {
    if (bottomRightClickable) {
        insertValue(bottomRightElement, turn, 8);
        bottomRightClickable = false;
        turn = changeTurn(turn);
        changeTurnText(turn);
    }
});

// restarts game
$(restart).click(function() {
    resetValues();
});


// Writes to cell to give X or O
function insertValue(element, turn, index) {
    if (turn == 0) {
        element.innerHTML = 'X';
    } else {
        element.innerHTML = 'O';
    }

    valueArray[index] = element.innerHTML;

    plays++;

}

// Changes turn
function changeTurn(turn) {
    return (turn + 1) % 2;
}

// Changes text above game
function changeTurnText(turn) {
    if (turn == 0) {
        turnTextElement.innerHTML = 'X\'s turn!'
    } else {
        turnTextElement.innerHTML = 'O\'s turn!'
    }
    endGameCheck();
}

function resetValues() {
    turn = 0;
    playerWon = false;

    changeTurnText(turn);
    setAllClickable(true);

    for (var i = 0; i < elementArray.length; i++) {
        elementArray[i].innerHTML = "";
        elementArray[i].style.backgroundColor = "whitesmoke";
        valueArray[i] = "NULL";
    }

    location.reload();
}

function endGameCheck() {
    if (!playerWon) {
        winCondition("X");
    }
    if (!playerWon) {
        winCondition("O");
    }
    if (plays == 9 && !playerWon) {
        gameOver();
    }
}

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
    topLeftClickable = bool;
    topCenterClickable = bool;
    topRightClickable = bool;
    centerLeftClickable = bool;
    centerCenterClickable = bool;
    centerRightClickable = bool;
    bottomLeftClickable = bool;
    bottomCenterClickable = bool;
    bottomRightClickable = bool;
}

function win(string) {
    turnTextElement.innerHTML = "Player " + string + " has won!";
    setAllClickable(false);
    playerWon = true;
}

function colorize(int1, int2, int3) {
    var intArray = [int1, int2, int3];

    for (var i = 0; i < elementArray.length; i++) {
        elementArray[i].style.backgroundColor = "dimgray";
    }

    for (var i = 0; i < intArray.length; i++) {
        elementArray[intArray[i]].style.backgroundColor = "gold";
    }

}
