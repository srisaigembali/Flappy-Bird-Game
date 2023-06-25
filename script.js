// Game states
let GRAVITY = 5;
let FRAME_HEIGHT = 500;
let BIRD_SIZE = 50;
let BIRD_POS = FRAME_HEIGHT / 2;
let JUMP = 50;
let SCORE = 0;
let GAP = 25

function init() {
    play();
}

// Game elements
let bird = document.querySelector('.bird');
let pipes = [...document.querySelectorAll('.pipe')];
let score = document.querySelector('.score span');

function play() {
    setInterval(() => {
        const randomHeight = Math.floor(Math.random() * 50) + 5;
        pipes[1].style.height = `${randomHeight}%`;
        pipes[0].style.height = `${100 - (randomHeight + GAP)}%`;
        pipes[0].style.top = `${randomHeight + GAP}%`;
        SCORE += 10;
    }, 3000);
    setInterval(() => {
        BIRD_POS += GRAVITY
        if(BIRD_POS >= BIRD_SIZE + FRAME_HEIGHT) gameOver();
        if(collided(bird,pipes[0]) || collided(bird,pipes[1])) gameOver();
        if(BIRD_POS <= 0) BIRD_POS = 0;
    }, 100);
    setInterval(() => {
        bird.style.top = `${BIRD_POS}px`;
        score.innerText = SCORE;
    }, 100);

    //JUMO FUNCTION
    window.addEventListener("keyup", function(e){
        if(e.code !== "Space") return;
        BIRD_POS -= JUMP;
    });

}

function collided(source, target) {
    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    return(
        sourceRect.right >= targetRect.left &&
        sourceRect.left <= targetRect.right &&
        sourceRect.bottom >= targetRect.top &&
        sourceRect.top <= targetRect.bottom
    )
 }

function gameOver() {
    window.location.reload();
}

window.onload = init();
