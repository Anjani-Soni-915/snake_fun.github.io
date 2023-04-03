// Game constants and variables

let inputDir = { x: 0, y: 0 }; //initial stage
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');
let speed = 10;
let Score = 0;
let lastpaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }]
food = { x: 6, y: 7 };

// Game functions
function main(ctime) {
    window.requestAnimationFrame(main); //game loop
    // console.log(ctime)
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintTime = ctime;
    gameEngine();
}


function isCollide(snake) {
    // if you bump into yourself
    for(let i=1; i<snakeArr.length; i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    // if you bump into the wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    return false;
}

function gameEngine() {
    //part-1 updating the snake array and food
    if (isCollide(snakeArr)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over!! Press any key to play again!")
        snakeArr = [{ x: 15, y: 15 }];
        musicsound.play();
        Score = 0;

    }

    
    // if you have eaten the food, increment the score and regenarate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        Score=Score+1;
        if(Score>hiscoreval){
            hiscoreval = Score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        ScoreBox.innerHTML="Score: "+ Score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    
    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //part-2 Display the snake and food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeEle = document.createElement('div');
        snakeEle.style.gridRowStart = e.y;
        snakeEle.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeEle.classList.add('head');
        }
        else {
            snakeEle.classList.add('snake');
        }
        board.appendChild(snakeEle);
    })
    // display the food
    foodEle = document.createElement('div');
    foodEle.style.gridRowStart = food.y;
    foodEle.style.gridColumnStart = food.x;
    foodEle.classList.add('food');
    board.appendChild(foodEle);
}

// Game loop- used to paint the pg again and again
// Main logic of the game
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;

            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

    }
});