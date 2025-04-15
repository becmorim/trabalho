//board
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns; // 32 * 16
let boardHeight = tileSize * rows; // 32 * 16
let context;

//ship
let shipWidth = tileSize*2;
let shipHeight = tileSize;
let shipX = tileSize * columns/2 - tileSize;
let shipY = tileSize * rows - tileSize*2;

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

    let shipImg;
    let shipVelocityX = tileSize; 
    //aliens
    let alienArray = [];
    let alienWidth = tileSize*2;
    let alienHeight = tileSize;
    let alienX = tileSize;
    let alienY = tileSize;
    let alienImg;

    let alienRows = 2;
    let alienColumns = 3;
    let alienCount = 0; //aliens pra derrotar
    let alienVelocityX = 1; //velocidade do alien

    //tiros
    let bulletArray = [];
    let bulletVelocityY = -10; //velocidade dos tiros


window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight
    context = board.getContext("2d"); // pra desenhar
  // carregar a img
  shipImg =new Image();
  shipImg.src = "./ship.png";
  shipImg.onload = function() {
  context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)
  }
  alienImg = new Image();
  alienImg.src = "./alien.png";
  createAliens();

  requestAnimationFrame(update);
  document.addEventListener("keydown", moveShip);
  document.addEventListener("keyup", shoot);
}
function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);
  //nave
  context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height)
  //aliens
  for (let i = 0; i < alienArray.length; i++) {
    let alien = alienArray[i];
    if (alien.alive) {
        alien.x += alienVelocityX;
        // fazer o alien ir e voltar
        if (alien.x + alien.width >= board.width || alien.x <=0) {
            alienVelocityX *= -1;
            alien.x += alienVelocityX*2;
            //mover os aliens
            for (let j = 0; j < alienArray.length; j++) {
                alienArray[j].y += alienHeight;
            }
        }
        context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
    }
  }
  for(let i = 0; i < bulletArray.length; i++){
      let bullet = bulletArray[i];
      bullet.y += bulletVelocityY;
      context.fillStyle="white";
      context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
  }
}

function moveShip(e) {
    if (e.code == "ArrowLeft" && ship.x - shipVelocityX >= 0) {
        ship.x -= shipVelocityX; // esquerda
    }
    else if (e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width) {
        ship.x += shipVelocityX //direita
    }
}

function createAliens() {
    for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alien = {
                img : alienImg,
                x : alienX + c*alienWidth,
                y : alienY + r*alienHeight,
                width : alienWidth,
                height : alienHeight,
                alive : true
            }
            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}

function shoot(e) {

    if (e.code == "Space") {
        //atira
        let bullet = {
            x : ship.x + shipWidth*15/32,
            y : ship.y,
            width : tileSize/8,
            height : tileSize/2,
            used : false
        }
        bulletArray.push(bullet);
    }
}