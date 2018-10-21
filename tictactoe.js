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

var elements = {tl:0, tc:1, tr:2, cl:3, cc:4, cr:5, bl:6, bc:7, br:8};


// TOP ELEMENTS CLICK EVENT LISTENERS
$(topLeftElement).click(function() {
    playTurn(elements.tl);
});

$(topCenterElement).click(function() {
    playTurn(elements.tc);

});

$(topRightElement).click(function() {
    playTurn(elements.tr);

});

// CENTER ELEMENTS CLICK EVENT LISTENERS
$(centerLeftElement).click(function() {
    playTurn(elements.cl);

});

$(centerCenterElement).click(function() {
    playTurn(elements.cc);

});

$(centerRightElement).click(function() {
    playTurn(elements.cr);
});

// BOTTOM ELEMENTS CLICK EVENT LISTENERS
$(bottomLeftElement).click(function() {
    playTurn(elements.bl);

});

$(bottomCenterElement).click(function() {
    playTurn(elements.bc);
});

$(bottomRightElement).click(function() {
    playTurn(elements.br);
});

// restarts game
$(restart).click(function() {
    resetValues();
});

// Takes care of a turn
function playTurn(element) {
    if (boolArray[element]) {
        insertValue(elementArray[element], turn, element);
        boolArray[element] = false;
        turn++;
    }   
}

// Writes to cell to give X or O
function insertValue(element, turn, index) {
    if (turn % 2 == 0) {
        element.innerHTML = 'X';
        turnTextElement.innerHTML = 'O\'s turn!'
    } else {
        element.innerHTML = 'O';
        turnTextElement.innerHTML = 'X\'s turn!'
    }

    valueArray[index] = element.innerHTML;
    
    endGameCheck();
}

// Resets all values and reloads page
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
