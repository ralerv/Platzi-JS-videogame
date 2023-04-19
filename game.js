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
const resultContainer = document.querySelector("#result");
const resumePageContainer = document.querySelector(".resume-page")
const personajeIcon = document.querySelector("#personaje");
const metaIcon = document.querySelector("#meta");
const obstaculoIcon = document.querySelector("#obstaculo");

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let blocksPositions = []

let empezar = false; //si aún no empieza (false), esperar que se mueva el pj, si ya empezo (true), se ignora ¿? 
let elementSize;
let canvasSize = 0;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

window.addEventListener("load",setCanvasSize);
window.addEventListener("resize",setCanvasSize);

window.addEventListener("keydown",keyboardDown);
window.addEventListener("keyup",keyboardUp);
btnUp.addEventListener("click",moveUp)
btnLeft.addEventListener("click",moveLeft)
btnDown.addEventListener("click",moveDown)
btnRight.addEventListener("click",moveRight)
btnUp.addEventListener("touchend",moveUp) //Touchable devices
btnLeft.addEventListener("touchend",moveLeft)
btnDown.addEventListener("touchend",moveDown)
btnRight.addEventListener("touchend",moveRight)
  
personajeIcon.innerText = emojis["PLAYER"];
metaIcon.innerText = emojis["O"];
obstaculoIcon.innerText = emojis["X"];


function buttonStart(){
    introContainer.classList.add("move");
    gameplayContainer.classList.add("move");
}

function setCanvasSize(){
    canvasSize = canvas.clientWidth;

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
    showRecord()
    const map = maps[level];

    if(!map){
        gameWin();
        return
    }

    if (empezar && !timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval (showTime,10);
        
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



function moveUp() {
    empezar = true;
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
    empezar = true;
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
    empezar = true;
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
    empezar = true;
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
function showTime(reinicio){
    let gameClock = Date.now()-timeStart; //reloj desde que empiza el juego
    let Clock = new Date(gameClock); //convertir al reloj en un objeto para extraer sus valroes
    let ClockMinutes = Clock.getMinutes() //obtener minutos
    let ClockSeconds = Clock.getSeconds() //obtener segundos
    let ClockMilliseconds = Clock.getMilliseconds().toString().slice(0, 2) //obtener milisegundos, convertirlo a string para extraer solo los 2 primeros
    if (ClockSeconds < 10) //agregar 0 a la derecha si los segundos son menores 10
    {ClockWithFormat = (ClockMinutes + ":0" + ClockSeconds + ":" + ClockMilliseconds)}
    else {ClockWithFormat = (ClockMinutes + ":" + ClockSeconds + ":" + ClockMilliseconds)}; //si los segundos son iguales o mayores a 10 no se le agrega nada
    if (reinicio == "reinicio"){ClockWithFormat="0:00:00"}
    spanTime.innerText = ClockWithFormat.toString();
    console.log(gameClock)
}

function showRecord(){
    let recordHTML = (localStorage.getItem("record_time"));
    if (!localStorage.getItem("record_time")){
        recordHTML = "000000"
    }
    spanRecord.innerHTML = recordHTML;
}

function gameWin(){
    resultContainer.innerText = "🎉 Juego completado"
    clearInterval(timeInterval)

    const recordTime = localStorage.getItem("record_time");
    const playerTime = Date.now() - timeStart;

    if (recordTime){
        if (recordTime >= playerTime){
            localStorage.setItem("record_time",playerTime);
            spanNewRecord.innerText = " ¡Nuevo Record!";
        }
    } else {
        localStorage.setItem("record_time",playerTime);
        spanNewRecord.innerText = " ¡Nuevo Record!";
    }

    showResults()
}

function levelFail(){
    console.log("pipipi");
    if (lives <= 0){
        clearInterval(timeInterval)
        resultContainer.innerText = "No pudiste completar el juego :(";
        showResults()
    } else{
        playerPosition.x = undefined;
        playerPosition.y = undefined;
        startGame();
    }
}

function showResults(){
    showRecord()
    resumePageContainer.classList.add("show");
}

function restartRecords(){
    localStorage.removeItem("record_time");
}

function restartGame(){
    resumePageContainer.classList.remove("show");
    level = 0;
    lives = 3;
    timeStart = undefined;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    empezar = false;
    showTime("reinicio")
    startGame();
}