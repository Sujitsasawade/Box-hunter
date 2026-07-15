// Box Hunter Game Script

const startBtn = document.getElementById("startBtn");
const boxes = document.querySelectorAll(".box");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const gameOverText = document.getElementById("gameOver");

let score = 0;
let time = 30;
let timer;
let gameRunning = false;
let difficulty = "easy";


// Difficulty Settings
const settings = {
    easy: {
        speed: 1200
    },
    medium: {
        speed: 800
    },
    hard: {
        speed: 500
    }
};


// Start Game
startBtn.addEventListener("click", () => {

    if(gameRunning) return;

    gameRunning = true;
    score = 0;
    time = 30;

    scoreText.innerHTML = "Score: " + score;
    timerText.innerHTML = "Time: " + time;

    gameOverText.style.display = "none";

    startTimer();
    moveBox();

});


// Select Difficulty
document.querySelectorAll(".difficulty").forEach(btn => {

    btn.addEventListener("click",()=>{

        difficulty = btn.dataset.level;

    });

});


// Timer Function
function startTimer(){

    timer = setInterval(()=>{

        time--;

        timerText.innerHTML = "Time: " + time;


        if(time <= 0){

            endGame();

        }

    },1000);

}



// Move Random Box

function moveBox(){

    if(!gameRunning)
        return;


    boxes.forEach(box=>{
        box.classList.remove("active");
    });


    let randomBox =
    boxes[Math.floor(Math.random()*boxes.length)];


    randomBox.classList.add("active");


    setTimeout(()=>{

        if(gameRunning)
            moveBox();

    }, settings[difficulty].speed);

}



// Box Click Event

boxes.forEach(box=>{


    box.addEventListener("click",()=>{


        if(!gameRunning)
            return;



        if(box.classList.contains("active")){


            score++;


            scoreText.innerHTML =
            "Score: " + score;



            box.classList.remove("active");


        }


    });


});



// Game Over

function endGame(){

    gameRunning = false;

    clearInterval(timer);


    boxes.forEach(box=>{
        box.classList.remove("active");
    });


    gameOverText.style.display="block";


    gameOverText.innerHTML =
    "Game Over! Score: " + score;



    saveHighScore();

}



// High Score

function saveHighScore(){

    let highScore =
    localStorage.getItem("boxHunterHighScore") || 0;


    if(score > highScore){

        localStorage.setItem(
            "boxHunterHighScore",
            score
        );

    }

}



// Show High Score

let high =
localStorage.getItem("boxHunterHighScore") || 0;


const highScoreText =
document.getElementById("highScore");


if(highScoreText){

    highScoreText.innerHTML =
    "High Score: " + high;

}
// ===============================
// BOX HUNTER SCRIPT.JS PART 2
// ===============================


// Move box randomly
function moveBox() {

    let maxX = gameArea.clientWidth - boxSize;
    let maxY = gameArea.clientHeight - boxSize;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    box.style.left = randomX + "px";
    box.style.top = randomY + "px";

}


// Box Click Event
box.addEventListener("click", function () {

    if (!gameStarted) return;


    score++;

    scoreDisplay.innerHTML = score;


    // Increase difficulty
    if(score % 5 === 0){

        speed -= 100;

        if(speed < 300){
            speed = 300;
        }

    }


    moveBox();

});



// Timer Function
function startTimer(){

    timer = setInterval(function(){

        timeLeft--;

        timerDisplay.innerHTML = timeLeft;


        if(timeLeft <= 0){

            endGame();

        }


    },1000);

}



// End Game
function endGame(){

    clearInterval(timer);

    clearInterval(boxMovement);


    gameStarted = false;


    box.style.display = "none";


    finalScore.innerHTML =
    "Game Over! Your Score: " + score;


    startButton.innerHTML = "Play Again";


}



// Start Game Button
startButton.addEventListener("click", function(){


    score = 0;

    timeLeft = selectedTime;


    scoreDisplay.innerHTML = score;

    timerDisplay.innerHTML = timeLeft;


    gameStarted = true;


    box.style.display = "block";


    moveBox();


    clearInterval(timer);

    clearInterval(boxMovement);



    startTimer();



    boxMovement = setInterval(function(){

        moveBox();

    },speed);



});



// Difficulty Selection

difficultyButtons.forEach(button => {


    button.addEventListener("click", function(){


        difficultyButtons.forEach(btn =>
            btn.classList.remove("active")
        );


        this.classList.add("active");


        difficulty = this.dataset.level;



        if(difficulty === "easy"){

            speed = 1200;

        }

        else if(difficulty === "medium"){

            speed = 800;

        }

        else if(difficulty === "hard"){

            speed = 500;

        }


    });


});



// Time Mode Selection

timeButtons.forEach(button => {


    button.addEventListener("click", function(){


        timeButtons.forEach(btn =>
            btn.classList.remove("active")
        );


        this.classList.add("active");


        selectedTime =
        Number(this.dataset.time);



    });


});


// Save High Score

function saveScore(){

    let highScore =
    localStorage.getItem("boxHunterHighScore");


    if(score > highScore){

        localStorage.setItem(
            "boxHunterHighScore",
            score
        );

    }


}


// Load High Score

function loadScore(){

    let highScore =
    localStorage.getItem("boxHunterHighScore");


    if(highScore){

        highScoreDisplay.innerHTML =
        highScore;

    }

}


loadScore();

// ===============================
// BOX HUNTER - SCRIPT.JS PART 3
// ===============================


// Update high score
function updateHighScore() {

    if(score > highScore) {
        highScore = score;

        localStorage.setItem(
            "boxHunterHighScore",
            highScore
        );

        highScoreText.innerText =
            "High Score: " + highScore;
    }

}



// Game Over Function
function gameOver() {

    gameRunning = false;

    clearInterval(boxTimer);
    clearInterval(timeTimer);

    box.style.display = "none";


    finalScore.innerText =
        "Your Score: " + score;


    gameOverScreen.classList.add("show");


    updateHighScore();

}



// Restart Game
function restartGame() {

    score = 0;
    timeLeft = selectedTime;


    scoreText.innerText =
        "Score: " + score;


    timerText.innerText =
        "Time: " + timeLeft;


    gameOverScreen.classList.remove("show");


    startGame();

}



// Sound Effects

function playCatchSound(){

    if(soundEnabled){

        catchSound.currentTime = 0;
        catchSound.play();

    }

}



function playMissSound(){

    if(soundEnabled){

        missSound.currentTime = 0;
        missSound.play();

    }

}



// Dark Mode Toggle

darkBtn.addEventListener(
    "click",
    ()=>{

        document.body.classList.toggle(
            "dark-mode"
        );


        darkBtn.innerHTML =
        document.body.classList.contains(
            "dark-mode"
        )
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

    }
);



// Sound Toggle

soundBtn.addEventListener(
    "click",
    ()=>{

        soundEnabled = !soundEnabled;


        soundBtn.innerHTML =
        soundEnabled
        ? "🔊 Sound ON"
        : "🔇 Sound OFF";

    }
);



// Keyboard Support

document.addEventListener(
    "keydown",
    (e)=>{


        if(e.key === "Enter"){

            if(!gameRunning){

                startGame();

            }

        }


        if(e.key === "Escape"){

            gameOver();

        }


    }
);



// Page Load High Score

window.onload = ()=>{


    let savedScore =
    localStorage.getItem(
        "boxHunterHighScore"
    );


    if(savedScore){

        highScore =
        Number(savedScore);


        highScoreText.innerText =
        "High Score: " + highScore;

    }


};
// ===============================
// SOUND EFFECTS
// ===============================

function playClickSound() {
    const audio = new Audio(
        "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
    );
    audio.volume = 0.3;
    audio.play();
}


function playGameOverSound() {
    const audio = new Audio(
        "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3"
    );
    audio.volume = 0.4;
    audio.play();
}


// ===============================
// BUTTON EVENTS
// ===============================

restartBtn.addEventListener("click", () => {

    playClickSound();

    clearInterval(timerInterval);

    score = 0;
    timeLeft = selectedTime;

    scoreText.innerHTML = score;
    timerText.innerHTML = timeLeft;

    startScreen.classList.remove("hide");
    gameScreen.classList.add("hide");

    box.style.display = "none";
});


// ===============================
// KEYBOARD CONTROL
// ===============================

document.addEventListener("keydown", (event)=>{

    if(event.key === "Enter"){

        if(startScreen.classList.contains("hide") === false){

            startGame();

        }

    }

});


// ===============================
// MOBILE TOUCH SUPPORT
// ===============================

box.addEventListener("touchstart", ()=>{

    if(gameRunning){

        catchBox();

    }

});


// ===============================
// WINDOW RESIZE FIX
// ===============================

window.addEventListener("resize", ()=>{

    if(gameRunning){

        moveBox();

    }

});


// ===============================
// INITIAL LOAD
// ===============================

window.onload = ()=>{

    scoreText.innerHTML = 0;
    timerText.innerHTML = selectedTime;

    box.style.display = "none";

};



// ===============================
// SAVE HIGH SCORE
// ===============================

function saveHighScore(){

    let highScore =
    localStorage.getItem("boxHunterHighScore") || 0;


    if(score > highScore){

        localStorage.setItem(
            "boxHunterHighScore",
            score
        );

    }

}



// ===============================
// SHOW HIGH SCORE
// ===============================

function showHighScore(){

    let highScore =
    localStorage.getItem("boxHunterHighScore") || 0;


    highScoreText.innerHTML =
    highScore;

}


showHighScore();


// ===============================
// FINAL CLEANUP
// ===============================

document.addEventListener(
"visibilitychange",
()=>{

    if(document.hidden && gameRunning){

        clearInterval(timerInterval);

    }

});


// ===============================
// END OF SCRIPT.JS
// ===============================
// ===============================
// SOUND EFFECTS
// ===============================

const clickSound = new Audio(
    "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3"
);

const gameOverSound = new Audio(
    "https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3"
);


// ===============================
// BOX CLICK EFFECT
// ===============================

box.addEventListener("click", () => {

    if (!gameRunning) return;

    score++;

    scoreDisplay.textContent = score;

    clickSound.currentTime = 0;
    clickSound.play();

    createParticles(
        box.offsetLeft,
        box.offsetTop
    );

    moveBox();

    increaseDifficulty();

});


// ===============================
// PARTICLE EFFECT
// ===============================

function createParticles(x, y){

    for(let i = 0; i < 8; i++){

        let particle = document.createElement("div");

        particle.className = "particle";

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        gameArea.appendChild(particle);


        let angle = Math.random() * Math.PI * 2;

        let distance = Math.random() * 50 + 20;


        particle.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        particle.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );


        setTimeout(()=>{
            particle.remove();
        },600);

    }

}


// ===============================
// DIFFICULTY SYSTEM
// ===============================

function increaseDifficulty(){

    if(score % 5 === 0){

        speed += 100;

        if(speed > 900){
            speed = 900;
        }

    }

}


// ===============================
// HIGH SCORE SYSTEM
// ===============================

function saveHighScore(){

    let oldScore =
    localStorage.getItem("boxHunterHighScore");


    if(score > oldScore){

        localStorage.setItem(
            "boxHunterHighScore",
            score
        );

    }

}


function showHighScore(){

    let highScore =
    localStorage.getItem("boxHunterHighScore");


    if(highScore){

        highScoreDisplay.textContent =
        highScore;

    }

}


// ===============================
// RESET GAME
// ===============================

function resetGame(){

    score = 0;

    scoreDisplay.textContent = score;

    timeLeft = selectedTime;

    speed = defaultSpeed;

    box.style.display = "none";

}


// ===============================
// GAME END
// ===============================

function gameEnd(){

    gameRunning = false;

    clearInterval(timer);

    box.style.display = "none";


    saveHighScore();


    gameOverSound.play();


    finalScore.textContent =
    "Your Score : " + score;


    gameOverScreen.classList.add("show");

}


// ===============================
// INITIAL LOAD
// ===============================

window.onload = () => {

    showHighScore();

};
// ===============================
// LEVEL COMPLETE & GAME OVER SYSTEM
// ===============================

function levelComplete() {

    clearInterval(gameLoop);

    box.style.display = "none";

    level++;

    if (level > maxLevel) {

        showResult(
            "🏆 YOU WON!",
            "All levels completed!"
        );

        return;
    }


    showResult(
        "🎯 LEVEL COMPLETE",
        "Starting next level..."
    );


    setTimeout(() => {

        startLevel();

    }, 2000);

}



// ===============================
// GAME OVER
// ===============================

function gameOver() {

    clearInterval(gameLoop);

    box.style.display = "none";


    showResult(
        "💀 GAME OVER",
        "Final Score : " + score
    );

}



// ===============================
// RESULT DISPLAY
// ===============================

function showResult(title, text) {

    resultBox.innerHTML = `

        <h2>${title}</h2>

        <p>${text}</p>

        <button onclick="restartGame()">
            Restart
        </button>

    `;


    resultBox.style.display = "block";

}



// ===============================
// RESTART GAME
// ===============================

function restartGame() {

    score = 0;
    level = 1;
    timeLeft = gameTime;


    scoreText.innerHTML = score;

    resultBox.style.display = "none";


    startGame();

}



// ===============================
// SOUND SYSTEM
// ===============================

function playClickSound(){

    if(clickSound){

        clickSound.currentTime = 0;

        clickSound.play();

    }

}



// ===============================
// KEYBOARD SUPPORT
// ===============================

document.addEventListener(
"keydown",
function(event){


    if(event.key === "Escape"){

        gameOver();

    }


    if(event.key === "r" ||
       event.key === "R"){

        restartGame();

    }


});



// ===============================
// MOBILE TOUCH SUPPORT
// ===============================

box.addEventListener(
"touchstart",
function(){

    catchBox();

});



// ===============================
// INITIAL LOAD
// ===============================

window.onload = function(){

    startScreen.style.display = "flex";

    gameScreen.style.display = "none";

};
// ===============================
// SOUND EFFECTS
// ===============================

const clickSound = new Audio();
clickSound.src =
    "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";

const hitSound = new Audio();
hitSound.src =
    "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3";

const gameOverSound = new Audio();
gameOverSound.src =
    "https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3";


// ===============================
// BUTTON EVENTS
// ===============================

startBtn.addEventListener("click", () => {

    clickSound.play();

    startScreen.classList.add("hide");
    gameScreen.classList.remove("hide");

    resetGame();
    startGame();

});


restartBtn.addEventListener("click", () => {

    clickSound.play();

    gameOverScreen.classList.add("hide");
    gameScreen.classList.remove("hide");

    resetGame();
    startGame();

});


menuBtn.addEventListener("click", () => {

    clickSound.play();

    gameOverScreen.classList.add("hide");
    startScreen.classList.remove("hide");

});


// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener("keydown", (e)=>{

    if(e.key === "Escape"){

        if(gameRunning){

            pauseGame();

        }

    }

});


// ===============================
// PAUSE SYSTEM
// ===============================

function pauseGame(){

    gameRunning = false;

    clearInterval(boxTimer);
    clearInterval(timeTimer);

    pauseScreen.classList.remove("hide");

}



resumeBtn.addEventListener("click",()=>{

    clickSound.play();

    pauseScreen.classList.add("hide");

    gameRunning = true;

    startBoxMovement();

    startTimer();

});


// ===============================
// GAME STATISTICS
// ===============================

function updateStats(){

    scoreText.innerHTML = score;

    highScoreText.innerHTML = highScore;

    levelText.innerHTML =
        difficulty.toUpperCase();

}



function saveHighScore(){

    if(score > highScore){

        highScore = score;

        localStorage.setItem(
            "boxHunterHighScore",
            highScore
        );

    }

}


// ===============================
// LOAD DATA
// ===============================

window.onload = ()=>{

    highScore =
        localStorage.getItem(
            "boxHunterHighScore"
        ) || 0;


    highScoreText.innerHTML =
        highScore;

};



// ===============================
// MOBILE TOUCH SUPPORT
// ===============================

gameArea.addEventListener(
"touchstart",
(e)=>{

    if(!gameRunning)
        return;


    let touch =
        e.touches[0];


    let rect =
        gameArea.getBoundingClientRect();


    let x =
        touch.clientX - rect.left;


    let y =
        touch.clientY - rect.top;


    movePlayer(x,y);

});



function movePlayer(x,y){

    player.style.left =
        x - player.offsetWidth/2 + "px";


    player.style.top =
        y - player.offsetHeight/2 + "px";

}



// ===============================
// FINAL CLEANUP
// ===============================

function cleanup(){

    clearInterval(boxTimer);

    clearInterval(timeTimer);

    gameRunning = false;

}


window.addEventListener(
"beforeunload",
cleanup
);
// ===============================
// SCORE SYSTEM
// ===============================

function updateScore() {
    scoreText.innerHTML = `Score: ${score}`;
    highScoreText.innerHTML = `High Score: ${highScore}`;
}


// ===============================
// GAME OVER FUNCTION
// ===============================

function gameOver() {

    gameRunning = false;

    clearInterval(gameInterval);
    clearInterval(timerInterval);

    finalScore.innerHTML = `Your Score: ${score}`;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("boxHunterHighScore", highScore);
    }

    highScoreText.innerHTML = `High Score: ${highScore}`;

    gameOverScreen.classList.remove("hidden");

}


// ===============================
// RESTART GAME
// ===============================

restartBtn.addEventListener("click", () => {

    gameOverScreen.classList.add("hidden");

    score = 0;
    timeLeft = selectedTime;

    updateScore();

    startGame();

});


// ===============================
// HOME BUTTON
// ===============================

homeBtn.addEventListener("click", () => {

    gameOverScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");

    gameArea.innerHTML = "";

});


// ===============================
// LOAD HIGH SCORE
// ===============================

window.onload = () => {

    highScore = localStorage.getItem("boxHunterHighScore") || 0;

    highScoreText.innerHTML = 
    `High Score: ${highScore}`;

};


// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener("keydown", (event)=>{

    if(event.key === "Escape" && gameRunning){

        gameOver();

    }

});


// ===============================
// MOBILE TOUCH SUPPORT
// ===============================

gameArea.addEventListener("touchstart", ()=>{

    if(gameRunning){

        createBox();

    }

});


// ===============================
// PREVENT RIGHT CLICK
// ===============================

document.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

});


// ===============================
// END OF SCRIPT
// ===============================