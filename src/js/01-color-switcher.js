const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let idTimerInterval = null;

btnBlock(refs.btnStop);
refs.btnStart.addEventListener('click', onStart);
refs.btnStop.addEventListener('click', onStop);

function onStart() {
  btnBlock(refs.btnStart);
  btnUnlock(refs.btnStop);
  if (!idTimerInterval) {
    idTimerInterval = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
}

function onStop() {
  btnBlock(refs.btnStop);
  btnUnlock(refs.btnStart);
  idTimerInterval = clearInterval(idTimerInterval);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function btnBlock(btnEl) {
  if (!btnEl.hasAttribute('disabled')) {
    btnEl.setAttribute('disabled', '');
  }
}

function btnUnlock(btnEl) {
  if (btnEl.hasAttribute('disabled')) {
    btnEl.removeAttribute('disabled');
  }
}
