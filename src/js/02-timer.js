import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysDiv: document.querySelector('[data-days]'),
  hoursDiv: document.querySelector('[data-hours]'),
  minutesDiv: document.querySelector('[data-minutes]'),
  secondsDiv: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= options.defaultDate) {
      alert('Please choose a date in the future ⌚⏩');
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

refs.startBtn.addEventListener('click', onBtnClick);

function onBtnClick() {
  setInterval(() => {
    const now = new Date();
    const diff = calendar.selectedDates[0] - now;

    const timeLeft = convertMs(diff);
    refs.daysDiv.textContent = timeLeft.days;
    refs.hoursDiv.textContent = timeLeft.hours;
    refs.minutesDiv.textContent = timeLeft.minutes;
    refs.secondsDiv.textContent = timeLeft.seconds;
  }, 1000);
}
