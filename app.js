document.body.onload = game;

function game () { 


var app = document.getElementById("app");


var player;
var model;
var currentPlayer = {X: true};
if (currentPlayer.X) {
    player = 'X'
} else {
    player = 'O'
}

var playerEl = document.getElementById("current-player");
playerEl.innerHTML= 'Current Player: X';



//create div box that will be divided into 9 sections

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

    model = {
        0: [0,1,2],
        1: [3,4,5],
        2: [6,7,8]
    };
};

makeGrid();

var newGame = document.getElementById('new-game');
newGame.addEventListener("click", function(event) {
    event.preventDefault();
    for (var i = 0; i < 9; i++) {
        var box = document.getElementById(i);
        grid.removeChild(box);
    }
    makeGrid();
})


function renderSymbol (id, player) {
  //place an X everytime player X clicks
      var symbol = document.createElement("div");
      symbol.setAttribute("style", "text-align: center; margin-top: 35px;")
      symbol.innerHTML= `<b>${player}</b>`;
      id.appendChild(symbol);
}

function changeModel (id, player) {
    if (id < 3) {
        model[0][id] = player
    } else if (id >= 3 && id < 6) {
        model[1][id-3] = player
    } else {
        model[2][id-6] = player
    }
}


//create clickHandler everytime one of the 9 boxes are clicked

function handleGridClick(event) {
    event.preventDefault();
    var player;
    var el = document.getElementById(event.srcElement.id);
    var id = event.srcElement.id;
    if (currentPlayer.X) {
        player = 'X'
    } else {
        player = 'O'
    }
    renderSymbol(el, player);
    changeModel(id, player);
    //are rows filled with X or O's?
    if (hasWon.row(player)) {
        alert(`Player ${player} won!`)
    };
    //are columns filled with X or O's?
    if (hasWon.column(player)) {
        alert(`Player ${player} won!`)
    };
    //are diagonals filled with X or O's?
    if (hasWon.diagonal(player)) {
        alert(`Player ${player} won!`)
    };

    //remove onclick attribute

    //change current player
    currentPlayer.X = !currentPlayer.X;
    playerEl.innerHTML= `Current Player: ${player}`;
}

var hasWon = {
    row: function (player) {
      for (var row in model) {
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
          for (var key in model) {
              if (model[key][i] === player) {
                  count++;
              }
              
          }
          if (count === 3) {
            return true;
        }
      }
      
    },
    diagonal: function (player) {
        if (model[0][0] === player && model[1][1] === player && model[2][2] === player) {
            return true;
        } else if (model[0][2] === player && model[1][1] === player && model[2][0] === player) {
            return true;
        } else {
            return false
        } 
    }
}
//each one of the 9 sections should reference the same class

   
};