
let maiorScore=0;
let lives = 5;

let score = 0;
let started = false;
let bunnyID=0;
let hardening=0;
let segundos=1000;

let bunnyInterval=0;
let hideBunnyTimeOut=0;


function playSom() {
    const audio = new Audio(`sounds/shot.mp3`);
    audio.play();
}

document.querySelector('.div-game').addEventListener('click', function (event) {
    playSom();
});


function newBunny (left, top){
    const bunny = new Image();
    bunny.id = bunnyID;
    bunny.className = 'bunny';
    // bunny.src = './img/live.jpg';
    bunny.src = './img/bunny.webp';
    bunny.style.cssText = `
    position: absolute;
    left: ${left}px;
    top: ${top}px;
    width: 100px;
    heigth: auto;
    `;
   
    bunny.addEventListener('click', function (event) {
        const thisBunny = document.getElementById(event.target.id);
        thisBunny.remove();
        score++;
        hardening++;
        document.querySelector('#score-title').textContent = `Score ${score}`;
        clearTimeout(hideBunnyTimeOut);
    });

    bunnyID++;
    return bunny;
};

function bunnyGenerator() {
    const screenSize = [];
    const currentBunnyID = bunnyID;
    screenSize[0]=document.querySelector('.div-game').clientWidth - 100; //-100 do tamalho da largura da imagens dos coelhos
    screenSize[1]=document.querySelector('.div-game').clientHeight - 100; //-100 do tamalho da altura da imagens dos coelhos

    function generateRandom(){
        const random = [];
        random[0] = Math.trunc(Math.random()*screenSize[0]) + 1; //width
        random[1] = Math.trunc(Math.random()*screenSize[1]) + 1; //Heigth
        return random;
    };
    const random = generateRandom();
    document.querySelector('.div-game').appendChild(newBunny(random[0],random[1]));
    hideBunny(currentBunnyID);
}

function bunnyAppearInterval(segundos) {
    bunnyInterval = setInterval(function(){bunnyGenerator(); }, segundos);
}

function livesCreator () {
    const livesObjCreate = document.createElement("h3");
    livesObjCreate.id="lives";
    livesObjCreate.className="gametext";
    livesObjCreate.textContent=`Lives: ${lives}`;
    document.querySelector('.div-data').appendChild(livesObjCreate);
}



//Sessão de remoção

const btnStop = document.querySelector("#btnStop");
btnStop.addEventListener('click', () => stopGame());

function stopGame() {
    stopBunny();
    deleteAllBunnies();
    document.querySelector('#score-title').textContent = 'Pressione uma tecla para iniciar';

    if(score>maiorScore){
        maiorScore=score;
        document.querySelector('#bigestscore').textContent = `Maior Score: ${maiorScore}`;
    }

    gameOverRemove();

    const gameOverObjCreate = document.createElement("h3");
    gameOverObjCreate.id = "gameover"
    gameOverObjCreate.className="gametext gameover-text";
    gameOverObjCreate.textContent="Game Over";
    document.querySelector('.div-game').appendChild(gameOverObjCreate);

    const gameOverScoreObjCreate = document.createElement("h3");
    gameOverScoreObjCreate.id = "gameover-score"
    gameOverScoreObjCreate.className="gametext gameover-text";
    gameOverScoreObjCreate.textContent=`Score: ${score}`;
    document.querySelector('.div-game').appendChild(gameOverScoreObjCreate);

    score = 0;
    started = false;
    nIntervalID=0;
    bunnyID=0;
    hardening=0;
    segundos=1000;


    const livesObjRemover = document.querySelector('#lives');
    livesObjRemover.remove();
    lives = 5;
}

function deleteAllBunnies(){
    document.querySelectorAll('.bunny').forEach(bunnyEl => {
        bunnyEl.remove();
    });
}

function hideBunny(id){
    const thisBunny = document.getElementById(id);

    hideBunnyTimeOut = setTimeout(function(){ 
        thisBunny.remove();
        lives--;
        document.querySelector('#lives').textContent = `Lives: ${lives}`;
        if(lives<0){
            stopGame();
            stopBunny();
        }
    }, 1500);


        if(hardening>=5){
            stopBunnyInGame(); //para o bunnyApear, para que seja chamado novamente com o novo intervalo
            segundos = segundos - 100;
            hardening=0;
        }

}

function stopBunny() {
    clearInterval(bunnyInterval);
  }

  function stopBunnyInGame() { //para o bunnyApear, para que seja chamado novamente com o novo intervalo
    hardening=0;
    clearInterval(bunnyInterval);
    bunnyAppearInterval(segundos);
  }

  function myStopFunction() {
    clearTimeout(myVar);
    console.log("Parado");
  }

function gameOverRemove(){
    const gameOverObjRemover = document.querySelector('#gameover');
    if(gameOverObjRemover){
        gameOverObjRemover.remove();
    }

    const gameOverScoreObjRemover = document.querySelector('#gameover-score');
    if(gameOverScoreObjRemover){
        gameOverScoreObjRemover.remove();
    }
}


//Sessão de inicio

document.addEventListener('keydown', event => {
    if (event && !started) {
        lives = 5;
        document.querySelector('#score-title').textContent = `Score ${score}`;
        started = true;
        lives = 5;

        gameOverRemove();
                
        bunnyAppearInterval(segundos);
        livesCreator();
    }
});











