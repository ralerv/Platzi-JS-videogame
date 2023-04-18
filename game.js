const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnDown = document.querySelector("#down");
const btnRight = document.querySelector("#right");
const spanLives = document.querySelector("#lives");
const spanLevel = document.querySelector("#level");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const spanNewRecord = document.querySelector("#new_record");
const introContainer = document.querySelector(".intro");
const gameplayContainer = document.querySelector(".gameplay");

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let blocksPositions = []

let elementSize;
let canvasSize = 0;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

window.addEventListener("load",setCanvasSize);
window.addEventListener("resize",setCanvasSize);

function buttonStart(){
    introContainer.classList.add("move");
    gameplayContainer.classList.add("move");
}

function setCanvasSize(){
    let percent = 1
    if (window.innerWidth > window.innerHeight) {
        canvasSize = window.innerHeight * percent;
    }
    else {
        canvasSize = window.innerWidth * percent;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    canvas.setAttribute("width", canvasSize)
    canvas.setAttribute("height", canvasSize)
    elementSize = canvasSize / 10;
    startGame();
}

function startGame(){
    game.font = elementSize + "px Verdana"
    game.textAlign = "end";

    const map = maps[level];

    if(!map){
        gameWin();
        return
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval (showTime,10);
        showRecord()
    }

    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    blocksPositions = [];
    showstats()
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
            } else if (col == "X") {
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
        const blockColissionX = block.x.toFixed(1) == playerPosition.x.toFixed(1)
        const blockColissionY = Math.floor(block.y) == Math.floor(playerPosition.y)
        return blockColissionX && blockColissionY
    })

    if (giftColission) {
        console.log("regalo xd")
        level += 1
        startGame()
    }

    if (blockColission) {
        lives -=1
        console.log("colision xd")
        levelFail()
    }

    game.fillText(emojis["PLAYER"], playerPosition.x,playerPosition.y);
}

function showstats(){
    spanLives.innerText = (emojis["HEART"].repeat(lives)).toString();
    spanLevel.innerText = (level + 1).toString();
}
function showTime(){
    spanTime.innerHTML = Date.now()-timeStart;
}

function showRecord(){
    spanRecord.innerHTML = (localStorage.getItem("record_time"));
}

function gameWin(){
    console.log("Ganaste xd");
    clearInterval(timeInterval)

    const recordTime = localStorage.getItem("record_time");
    const playerTime = Date.now() - timeStart;

    if (recordTime){
        if (recordTime >= playerTime){
            localStorage.setItem("record_time",playerTime);
            spanNewRecord.innerText = " ¡Nuevo Record!";
        }
        else {spanNewRecord.innerText = "noahyrecordsuperao";}
    } else {
        localStorage.setItem("record_time",playerTime);
        spanNewRecord.innerText = " ¡Nuevo Record!";
    }
    console.log({recordTime},{playerTime});
}

function levelFail(){
    
    console.log("pipipi");
    if (lives <= 0){
        level = 0;
        lives = 3;
        timeStart = undefined;
        alert("perdite xd");
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}