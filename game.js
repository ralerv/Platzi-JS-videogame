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

    mapRowCols.forEach((row,rowI) => {
        row.forEach((col,colI)=> {
            const emoji = emojis[col];
            let posX = elementSize * (colI + 1.2)
            let posy = elementSize * (rowI + 0.85)
            game.fillText(emoji,posX,posy)
        })
        
    });

}