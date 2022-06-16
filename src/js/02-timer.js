import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
};

disabledEl(refs.btnStart);

let idTimerInterval = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

flatpickr(refs.inputDate, options);
refs.btnStart.addEventListener('click', onClick);

refs.timer.style.display = 'flex';
for (const child of refs.timer.children) {
  child.style.display = 'flex';
  child.style.flexDirection = 'column';
  child.style.margin = '10px';
  child.firstElementChild.style.fontSize = '60px';
  child.lastElementChild.style.textAlign = 'center';
}

function onClick() {
  if (!checkForRelevance(selectedDate) || idTimerInterval) {
    return;
  }
  disabledEl(refs.btnStart);
  disabledEl(refs.inputDate);
  idTimerInterval = setInterval(() => {
    dateInterval = selectedDate - new Date();
    interfaceDrawing(convertMs(dateInterval));
    if (dateInterval < 1000) {
      idTimerInterval = clearInterval(idTimerInterval);
      unlockEl(refs.inputDate);
    }
  }, 1000);
}

function onClose(selectedDates) {
  selectedDate = selectedDates[0];
  if (!checkForRelevance(selectedDate)) {
    return;
  }
  unlockEl(refs.btnStart);
}

function checkForRelevance(dateValue) {
  const chekTime = dateValue.getTime();
  const nowTime = new Date().getTime();
  dateInterval = chekTime - nowTime;
  console.log('chek ', chekTime, ' now ', nowTime, ' interval ', dateInterval);
  // dateInterval = dateValue - new Date();
  if (dateInterval < 1) {
    window.alert('Please choose a date in the future');
    // Notify.warning('Please choose a date in the future', {
    //   position: 'center-top',
    // });
    disabledEl(refs.btnStart);
    return false;
  }
  return true;
}

function disabledEl(btnEl) {
  if (!btnEl.hasAttribute('disabled')) {
    btnEl.setAttribute('disabled', '');
  }
}

function unlockEl(btnEl) {
  if (btnEl.hasAttribute('disabled')) {
    btnEl.removeAttribute('disabled');
  }
}

function interfaceDrawing({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

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

function addLeadingZero(num) {
  return num.toString().padStart(2, 0);
}
