// ===============================
// BOX HUNTER GAME SCRIPT
// ===============================


// Elements
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const box = document.getElementById("box");

const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const highScoreText = document.getElementById("highScore");

const gameOverText = document.getElementById("gameOver");

const darkBtn = document.getElementById("darkBtn");
const soundBtn = document.getElementById("soundBtn");

const gameArea = document.getElementById("gameArea");


// Variables

let score = 0;
let time = 30;

let timer;
let boxMove;

let gameRunning = false;

let difficulty = "easy";

let soundEnabled = true;


// Speed Settings

let speed = {

    easy:1200,

    medium:800,

    hard:500

};



// Sounds

const clickSound = new Audio(
"https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
);


const overSound = new Audio(
"https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3"
);



// Load High Score

let highScore =
localStorage.getItem("boxHunterHighScore") || 0;


highScoreText.innerHTML =
"High Score: " + highScore;



// Start Game

startBtn.addEventListener("click",startGame);



restartBtn.addEventListener("click",()=>{

    gameOverText.style.display="none";

    startGame();

});



function startGame(){

    if(soundEnabled)
        clickSound.play();


    score=0;

    time=30;


    scoreText.innerHTML=
    "Score: "+score;


    timerText.innerHTML=
    "Time: "+time;


    gameRunning=true;


    gameOverText.style.display="none";


    box.style.display="block";


    moveBox();


    clearInterval(timer);

    clearInterval(boxMove);


    startTimer();


    boxMove=setInterval(()=>{

        moveBox();

    },speed[difficulty]);

}



// Move Box Randomly

function moveBox(){

    if(!gameRunning)
        return;


    let maxX =
    gameArea.clientWidth -
    box.offsetWidth;


    let maxY =
    gameArea.clientHeight -
    box.offsetHeight;



    let x =
    Math.random()*maxX;


    let y =
    Math.random()*maxY;



    box.style.left=x+"px";

    box.style.top=y+"px";

}



// Box Click

box.addEventListener("click",()=>{


    if(!gameRunning)
        return;


    score++;


    scoreText.innerHTML=
    "Score: "+score;



    if(soundEnabled)
        clickSound.play();



    moveBox();


    createParticles();

});




// Timer

function startTimer(){


timer=setInterval(()=>{


    time--;


    timerText.innerHTML=
    "Time: "+time;



    if(time<=0){

        endGame();

    }


},1000);


}




// Game End

function endGame(){


gameRunning=false;


clearInterval(timer);

clearInterval(boxMove);


box.style.display="none";



if(soundEnabled)
    overSound.play();



gameOverText.style.display="block";


gameOverText.innerHTML=
"Game Over! Score: "+score;



saveHighScore();


}




// Save Score

function saveHighScore(){


if(score > highScore){


    highScore=score;


    localStorage.setItem(
        "boxHunterHighScore",
        score
    );


}


highScoreText.innerHTML=
"High Score: "+highScore;


}



// Difficulty Buttons

document.querySelectorAll(".difficulty")
.forEach(btn=>{


btn.addEventListener("click",()=>{


difficulty=
btn.dataset.level;


});


});




// Dark Mode

darkBtn.addEventListener("click",()=>{


document.body.classList.toggle(
"dark-mode"
);


});




// Sound Toggle

soundBtn.addEventListener("click",()=>{


soundEnabled=!soundEnabled;



soundBtn.innerHTML=
soundEnabled
?"🔊 Sound ON"
:"🔇 Sound OFF";


});





// Keyboard Support

document.addEventListener("keydown",(e)=>{


if(e.key==="Enter" && !gameRunning){

    startGame();

}



if(e.key==="Escape"){

    endGame();

}


});




// Mobile Touch

box.addEventListener(
"touchstart",
()=>{


if(gameRunning){

    score++;

    scoreText.innerHTML=
    "Score: "+score;


    moveBox();

}


});




// Particle Effect

function createParticles(){


for(let i=0;i<6;i++){


let p=document.createElement("div");


p.className="particle";


p.style.left=
box.offsetLeft+"px";


p.style.top=
box.offsetTop+"px";



gameArea.appendChild(p);



setTimeout(()=>{

p.remove();

},500);



}



}




// Resize Fix

window.addEventListener(
"resize",
()=>{

if(gameRunning)
    moveBox();

});



// Initial State

window.onload=()=>{


box.style.display="none";


};
