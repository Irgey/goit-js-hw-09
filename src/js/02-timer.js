import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysDiv: document.querySelector('[data-days]'),
  hoursDiv: document.querySelector('[data-hours]'),
  minutesDiv: document.querySelector('[data-minutes]'),
  secondsDiv: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
  body: document.querySelector('body'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Report.failure(
        'Error',
        'Please choose a date in the future ⌚⏩',
        'Close'
      );
      refs.startBtn.setAttribute('disabled', 'true');
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};

refs.startBtn.setAttribute('disabled', 'true');
const calendar = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.startBtn.addEventListener('click', onBtnClick);

function onBtnClick() {
  Notiflix.Notify.success('The timer has started');
  const intervalId = setInterval(() => {
    const now = new Date();
    const diff = calendar.selectedDates[0] - now;
    if (diff <= 0) {
      refs.timer.insertAdjacentHTML(
        'afterend',
        '<div class = "extra"><h1>The time has come!</h1><iframe width="560" height="315" src="https://www.youtube.com/embed/xDeQVaoTvJM?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>'
      );
      refs.body.classList.add('ua-theme');
      refs.extra = document.querySelector('.extra');
      console.log(refs.videoPlayer);
      setTimeout(onVideohasEnded, 115000);
      function onVideohasEnded() {
        refs.extra.remove();
        refs.body.classList.remove('ua-theme');
      }
      clearInterval(intervalId);
      return;
    }
    function addLeadingZero() {
      const timeLeft = convertMs(diff);

      refs.daysDiv.textContent = timeLeft.days.toString().padStart(2, 0);
      refs.hoursDiv.textContent = timeLeft.hours.toString().padStart(2, 0);
      refs.minutesDiv.textContent = timeLeft.minutes.toString().padStart(2, 0);
      refs.secondsDiv.textContent = timeLeft.seconds.toString().padStart(2, 0);
    }
    addLeadingZero();
  }, 1000);
}
