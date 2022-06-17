import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onClickSubmit);

function onClickSubmit(event) {
  const inputDelay = parseInt(refs.delay.value, 10);
  const inputStep = parseInt(refs.step.value, 10);
  const inputAmount = parseInt(refs.amount.value, 10);
  let stepDelay = null;

  event.preventDefault();

  for (let i = 1; i <= inputAmount; i += 1) {
    stepDelay = i === 1 ? inputDelay : stepDelay + inputStep;

    createPromise(i, stepDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
