const wordlist = [
    'doctor',
    'persona',
    'hogar',
    'programa',
    'lenguaje',
    'desarrollo',
    'usuario',
    'trabajo',
    'libro',
    'alfabeto',
    'ciencia',
    'tecnologia',
    'tablero',
    'organizador',
    'metodologia',
    'mercadotecnia',
    'fermentacion',
    'refresco',
    'limpieza',
    'tareas',
    'busqueda',
    'laberinto',
    'libre',
    'largometraje',
    'maquillaje',
    'produccion',
    'parlamento',
    'sociedad',
    'demografia',
    'biologia',
    'astronomia'
];

let sec=0, min=0;

var timer = setInterval(
    () => {
        if (sec < 59) {
            sec++;
        } else {

            sec = 0;
            min++;
        }
        gameTime.textContent = String(min).padStart(2,0) + ':' + String(sec).padStart(2,0);
    },
    1000
);

function drawHangman () {
    attemps < 10 ? attemps++ : endGame();
    refreshAttempsLeft();
    for (let step = 0; step <= attemps; step++ ) {
        switch (step) {
            case 0: // Dibuja la base de la horca e inicia el timer...
                let base = new Image;
                base.src = 'assets/base.svg';
                base.onload = () => {
                    ctx.drawImage(base, 0,480);
                }
                break;
            case 1: // Dibuja el parante de la horca
                let stick_01 = new Image;
                stick_01.src = 'assets/stick_01.svg';
                stick_01.onload = () => {
                    ctx.drawImage(stick_01, 0,20);
                }
                break;
            case 2: // Dibuja el poste horizontal de la horca
                let stick_02 = new Image;
                stick_02.src = 'assets/stick_02.svg';
                stick_02.onload = () => {
                    ctx.drawImage(stick_02, 10,16);
                }
                break;
            case 3: // Dibuja la soga
                let rope = new Image;
                rope.src = 'assets/rope.svg';
                rope.onload = () => {
                    ctx.drawImage(rope, 162,20);
                }
                break;
            case 4: // Dibuja la cabeza
                let head = new Image;
                head.src = 'assets/head.svg';
                head.onload = () => {
                    ctx.drawImage(head, 130,90);
                }
                break;
            case 5: // Dibuja el cuerpo
                let body = new Image;
                body.src = 'assets/body.svg';
                body.onload = () => {
                    ctx.drawImage(body, 162,160);
                }
                break;
            case 6: // Dibuja una pierna
                let right_leg = new Image;
                right_leg.src = 'assets/right_leg.svg';
                right_leg.onload = () => {
                    ctx.drawImage(right_leg, 166,275);
                }
                break;
            case 7: // Dibuja otra pierna
                let left_leg = new Image;
                left_leg.src = 'assets/left_leg.svg';
                left_leg.onload = () => {
                    ctx.drawImage(left_leg, 124,275);
                }
                break;
            case 8: // Dibuja un brazo
                let right_arm = new Image;
                right_arm.src = 'assets/right_arm.svg';
                right_arm.onload = () => {
                    ctx.drawImage(right_arm, 166,180);
                }
                break;
            case 9: // Dibuja otro brazo
                let left_arm = new Image;
                left_arm.src = 'assets/left_arm.svg';
                left_arm.onload = () => {
                    ctx.drawImage(left_arm, 100,184);
                }
                break;
            case 10: // Dibuja la cara
                let face = new Image;
                face.src = 'assets/face.svg';
                face.onload = () => {
                    ctx.drawImage(face, 148,116);
                }
                break;
            default: // Algo raro pasó...
                console.log('Error en la variable attemps... ' + attemps)
                break;
        }
    }
}

function endGame(won=false) {
    const overlay = document.createElement('div');
    const container__main = document.querySelector('.container__main');
    const wonTitle = document.createElement('h2');
    const lostTitle = document.createElement('h2');
    wonTitle.classList.add('game__won');
    wonTitle.textContent = '¡Ganaste!';
    lostTitle.classList.add('game__lost');
    lostTitle.textContent = '¡Perdiste!';
    overlay.classList.add('game__overlay');
    container__main.appendChild(overlay);
    won ? overlay.appendChild(wonTitle) : overlay.appendChild(lostTitle);
    clearInterval(timer);
}

function refreshAttempsLeft() {
    attempsLeft.textContent = 10 - attemps;
}

function addEventListeners() {
    for (let vKey of vKeys) {
        vKey.addEventListener('click', function addEvt() {
                tryLetter(vKey.textContent);
            }
        );
    }
}

function removeEventListener(letter, wrong=false) {
    for (let vKey of vKeys) {
        if (vKey.textContent == letter) {
            vKey.classList.add('game__disabled');
            if (wrong) { vKey.classList.add('game__wrong'); }
            vKey.removeEventListener('click', ()=>{});
        }
    }
}

function tryLetter(letter) {
    if (String(gameWord).includes(letter)) {
        for (let len=0; len<gameWord.length; len++) {
            if (gameWord.charAt(len) == letter ) {
                gameLetters[len].classList.add('game__visible');
            }
        }
        removeEventListener(letter);
    } else {
        removeEventListener(letter, true);
        drawHangman();
    }
}

function drawWordContainer() {
    console.log(gameWord);
    for (let i=0; i<gameWord.length; i++) {
        let letter = document.createElement('div');
        letter.classList.add('game__letter');
        letter.classList.add('game__hidden');
        letter.textContent = gameWord.charAt(i);
        gameWordContainer.appendChild(letter);
    }
}

var attemps = -1;
let gameWord = wordlist[(Math.round((Math.random()*29)+1))];
const gameTime = document.querySelector('#game__time')
const attempsLeft = document.querySelector('#game__attemps');
const gameWordContainer = document.querySelector('#game__word');
drawWordContainer();
const gameLetters = document.querySelectorAll('.game__letter');
const canvas = document.querySelector('#game__canvas');
const vKeys = document.querySelectorAll('.game__vkey');
const ctx = canvas.getContext('2d');
document.onkeyup = (event)=>{tryLetter(event.key)};
drawHangman();
addEventListeners();