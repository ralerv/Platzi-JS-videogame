const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
let elementSize;
let canvasSize = 0;

window.addEventListener("load",setCanvasSize);
window.addEventListener("resize",setCanvasSize);

function setCanvasSize(){
    let percent = 0.8
    if (window.innerWidth > window.innerHeight) {
        canvasSize = window.innerHeight * percent;
    }
    else {
        canvasSize = window.innerWidth * percent;
    }

    canvas.setAttribute("width", canvasSize)
    canvas.setAttribute("height", canvasSize)
    elementSize = canvasSize / 10;
    startGame();
}

function startGame(){
    console.log(canvasSize,elementSize)

    game.font = elementSize + "px Verdana"
    game.textAlign = "end";

    const map = maps[0];
    console.log({map});
    const mapRows = maps[0].trim().split("\n");
    console.log({mapRows});
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({mapRowCols});

    for (let row = 1; row <=10 ; row++){
        for (let col = 1; col <=10 ; col++) {
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementSize * col, elementSize * row);
        }
    }
    
}