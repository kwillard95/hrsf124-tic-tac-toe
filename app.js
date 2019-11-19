document.body.onload = game;

function game () { 



var gameState = {
    currentPlayer: {X: true},
    model: null,
    round: 0
}

function findPlayer() {
    var player;
    if (gameState.currentPlayer.X) {
        player = 'X'
    } else {
        player = 'O'
    }
    return player;
}

var player = findPlayer();


var playerEl = document.getElementById("current-player");
playerEl.innerHTML= `Next Up: ${player}`;


//create div box that will be divided into 9 sections
var leaderboard = document.getElementById("leaderboard");
leaderboard.setAttribute("style", "display: inline-grid; grid-template-columns: auto auto; text-align:center");



var grid = document.getElementById("grid");
grid.setAttribute("style", "display: inline-grid; grid-template-columns: auto auto auto; text-align:center")

function makeGrid() {
    for (var i = 0; i < 9; i++) {
        var box = document.createElement("div");
        box.setAttribute("style", "width: 100px; height: 100px; border: 1px solid black; background-color: white; text-align:center");
        box.setAttribute("id", `${i}`);
        box.className = 'boxes';
        box.addEventListener("click", handleGridClick);
        grid.appendChild(box);
    
    }

    gameState.model = {
        0: [0,1,2],
        1: [3,4,5],
        2: [6,7,8]
    };
};

makeGrid();

var newGame = document.getElementById('new-game');
newGame.addEventListener("click", makeNewGame);

function makeNewGame (event) {
    if (event) {
      event.preventDefault();
    }
    for (var i = 0; i < 9; i++) {
        var box = document.getElementById(i);
        grid.removeChild(box);
    }
    makeGrid();
}

//create clickHandler everytime one of the 9 boxes are clicked

function handleGridClick(event) {
    event.preventDefault();
    var player = findPlayer();
    var el = document.getElementById(event.srcElement.id);
    var id = event.srcElement.id;

    renderSymbol(el, player);
    changeModel(id, player);
    //are rows filled with X or O's?
    if (checkWin.row(player)) {
        alert(`Player ${player} won!`);
        return hasWon(++gameState.round,player);

    };
    //are columns filled with X or O's?
    if (checkWin.column(player)) {
        alert(`Player ${player} won!`);
        return hasWon(++gameState.round,player);
    };
    //are diagonals filled with X or O's?
    if (checkWin.diagonal(player)) {
        alert(`Player ${player} won!`);
        return hasWon(++gameState.round,player);
    };
    //change current player
    gameState.currentPlayer.X = !gameState.currentPlayer.X;
    player = findPlayer();
    playerEl.innerHTML= `Next Up: ${player}`;
}

function renderSymbol (id, player) {
    //place an X everytime player X clicks
        var symbol = document.createElement("div");
        symbol.setAttribute("style", "text-align: center; margin-top: 35px;")
        symbol.innerHTML= `<b>${player}</b>`;
        id.appendChild(symbol);
  }
  
  function changeModel (id, player) {
      if (id < 3) {
          gameState.model[0][id] = player
      } else if (id >= 3 && id < 6) {
          gameState.model[1][id-3] = player
      } else {
          gameState.model[2][id-6] = player
      }
  }

var checkWin = {
    row: function (player) {
      for (var row in gameState.model) {
        var model = gameState.model;
        var count = 0;
          for (var i = 0; i < model[row].length; i++) {
              if (model[row][i] === player) {
                count++;
              }
          }
          if (count === 3) {
              return true;
          }
      }
    },
    column: function (player) {
      for (var i = 0; i < 3; i++) {
        var count = 0;
          for (var key in gameState.model) {
              if (gameState.model[key][i] === player) {
                  count++;
              }
              
          }
          if (count === 3) {
            return true;
        }
      }
      
    },
    diagonal: function (player) {
        var model = gameState.model;
        if (model[0][0] === player && model[1][1] === player && model[2][2] === player) {
            return true;
        } else if (model[0][2] === player && model[1][1] === player && model[2][0] === player) {
            return true;
        } else {
            return false
        } 
    }
}

function hasWon (round, winner) {
  var roundTitle = document.getElementById('round');
  var winnerTitle = document.getElementById('winner');
  var roundEl = document.createElement("div");
  var roundNum = document.createTextNode(`${round}`);
  roundEl.appendChild(roundNum);
  roundTitle.appendChild(roundEl);

  var winnerEl = document.createElement("div");
  var winnerText = document.createTextNode(`${winner}`);
  winnerEl.appendChild(winnerText);
  winnerTitle.appendChild(winnerEl);

  makeNewGame();
  playerEl.innerHTML= `Next Up: ${winner}`;
}
};