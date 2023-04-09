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

    for (let i = 1; i <=10 ; i++){
        game.fillText(emojis['X'], elementSize * i, elementSize * i);
    }
    
}