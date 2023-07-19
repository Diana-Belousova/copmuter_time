const input = document.querySelector('#inputField');
const btn = document.querySelector('#btn');
const question = document.querySelector('#question');
const timerText = document.querySelector('#timerText');
const audioStart = document.querySelector('#audioStart');
const audioRest = document.querySelector('#audioRest');

let timer;
let timerNew;
let i = 0;
let timerID;
let restID;
let rest = 10*60;

btn.addEventListener('click', setTimer);

function setTimer() {

    const time = input.value;
    timer = time*60;
    if (isNaN(timer)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You can write only numbers!',
        })
    }
    else {
        timerID = setInterval(countTimer, 1000, timer);
        btn.style.display = 'none';
        input.style.display = 'none';
        timerText.style.display = 'block';
        question.textContent = 'Work time left:';
        audioStart.play();
    }

}

function countTimer(timer) {
    timerNew = timer - i;
    if (timerNew >= 0) {
        let minutes = Math.floor(timerNew/60);
        let seconds = timerNew%60;
        i++;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        timerText.textContent = `${minutes} : ${seconds}`;
    }
    else {
        restID = setInterval(restTimer, 1000);
        clearInterval(timerID);
        question.textContent = 'Rest time left:';

    }
}

function restTimer() {
    if (rest >= 0) {
        audioRest.play();
        let minutesRest = Math.floor(rest/60);
        let secondsRest = rest%60;
        rest--;
        if (secondsRest < 10) {
            secondsRest = '0' + secondsRest;
        }
        timerText.textContent = `${minutesRest} : ${secondsRest}`;
    }
    else {
        clearInterval(restID);
        audioRest.pause();
        audioRest.currentTime = 0;
        timerText.style.display = 'none';
        input.style.display = 'block';
        btn.style.display = 'block';
        question.textContent = 'How much time do you want to work on computer?';
        i = 0;
        rest = 10*60;
    }
}

