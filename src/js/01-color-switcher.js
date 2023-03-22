import { getRandomHexColor } from './random-color';
const refs = {
  startBtn: document.querySelector('[data-start'),
  stopBtn: document.querySelector('[data-stop'),
  body: document.querySelector('body'),
};
// let intervalId = null;

refs.stopBtn.setAttribute('disabled', 'true');
console.dir(refs.startBtn);
refs.startBtn.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  intervalId = setInterval(changeBodyColor, 1000);
  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', 'true');
}

function changeBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

refs.stopBtn.addEventListener('click', onBtnStopClick);

function onBtnStopClick() {
  clearInterval(intervalId);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', 'true');
}
