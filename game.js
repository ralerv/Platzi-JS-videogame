const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnDown = document.querySelector("#down");
const btnRight = document.querySelector("#right");

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let blocksPositions = []

let flag=true;
let elementSize;
let canvasSize = 0;
let nivel = 0;

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
    startGame(nivel);
}

function startGame(level){
    game.font = elementSize + "px Verdana"
    game.textAlign = "end";

    const map = maps[0];
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    game.clearRect(0,0,canvasSize,canvasSize)

    mapRowCols.forEach((row,rowI) => {
        row.forEach((col,colI)=> {
            const emoji = emojis[col];
            let posX = elementSize * (colI + 1.2)
            let posy = elementSize * (rowI + 0.85)
            if (col == "O") {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posy;
                }
            } else if (col == "I") {
                giftPosition.x = posX;
                giftPosition.y = posy;
                console.log({giftPosition})
            } else if (col == "X" && flag) {
                blocksPositions.push(
                    {
                        x: posX,
                        y: posy,
                    }
                )
            }
            game.fillText(emoji,posX,posy)
        })
    });
    flag = false;
    movePlayer();
}

window.addEventListener("keydown",keyboardDown);
window.addEventListener("keyup",keyboardUp);
btnUp.addEventListener("click",moveUp)
btnLeft.addEventListener("click",moveLeft)
btnDown.addEventListener("click",moveDown)
btnRight.addEventListener("click",moveRight)

function moveUp() {
    console.log("Me movere hacia arriba");
    if (playerPosition.y < elementSize) {
        console.log({playerPosition})
        console.log('OUT');
      } else {
        playerPosition.y -= elementSize;
        startGame();
      }
  }
  
function moveLeft() {
    console.log("Me movere hacia izq");
    if ((playerPosition.x - elementSize) < elementSize) {
        console.log({playerPosition})
        console.log('OUT');
      } else {
        playerPosition.x -= elementSize;
        startGame();
      }    
}
 
function moveDown() {
    console.log("Me movere hacia aba");
    if ((playerPosition.y + elementSize) > canvasSize) {
        console.log({playerPosition})
        console.log('OUT');
      } else {
        playerPosition.y += elementSize;
        startGame();
      }
}
  
function moveRight() {
    console.log("Me movere hacia dere");
    if (playerPosition.x > canvasSize) {
        console.log({playerPosition})
        console.log('OUT');
      } else {
        playerPosition.x += elementSize;
        startGame();
      }
}

function keyboardDown(evento){
    let tecla = evento.key;
    switch (tecla) {
        case "ArrowUp":moveUp();break;
        case "ArrowLeft":moveLeft();break;
        case "ArrowDown":moveDown();break;
        case "ArrowRight":moveRight();break;
        default:break;
      }
}

function keyboardUp(evento){

}

function movePlayer(){
    const giftPositionX = Math.floor(giftPosition.x) == Math.floor(playerPosition.x)
    const giftPositionY = Math.floor(giftPosition.y) == Math.floor(playerPosition.y)
    const giftColission = giftPositionX && giftPositionY
    let blockColission = blocksPositions.find(block => {
        const blockColissionX = Math.floor(block.x) == Math.floor(playerPosition.x)
        const blockColissionY = Math.floor(block.y) == Math.floor(playerPosition.y)
        return blockColissionX && blockColissionY
    })

    if (giftColission) {
        console.log("regalo xd")
        nivel += 1
    }

    if (blockColission) {
        console.log("colision xd")
    }

    game.fillText(emojis["PLAYER"], playerPosition.x,playerPosition.y);
}

