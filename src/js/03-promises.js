import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
Notiflix.Notify.init({ useIcon: false });

const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', evt => {
  evt.preventDefault();
  const values = {
    amount: Number(evt.target.elements.amount.value),
    firstDelay: Number(evt.target.elements.delay.value),
    delayStep: Number(evt.target.elements.step.value),
  };
  let { amount, firstDelay, delayStep } = values;
  for (i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    firstDelay += delayStep;
    console.log(i, firstDelay);
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
