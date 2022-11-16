import {$} from "./utils.js";
const $lottoContainer = $(".lotto-container");
const $lottoCounter = $(".lotto-amount");

const randomLotto = (max = 45) => {
  if (Math.random === 0) return;

  return Math.ceil(Math.random() * max);
};

const countLotto = (number) => {
  $lottoCounter.innerText = 0;
  if (!number) return;

  $lottoCounter.innerText = number;
};

const issueLotto = (number) => {
  $lottoContainer.innerHTML = null;
  if (!number) return;

  Array(number)
    .fill(0)
    .forEach((_) => {
      $lottoContainer.innerHTML += `
      <div>
      <span class="mx-1 text-4xl">🎟️ </span>
      <span class="lotto-number">${Array.from({length: 6}, (_) =>
        randomLotto()
      )}</span>
      </div>
      `;
    });
};

const buyLotto = (payment) => {
  const LOTTO_PRICE = 1000;
  const numberOfLotto = Math.floor(payment / LOTTO_PRICE);

  issueLotto(numberOfLotto);
  countLotto(numberOfLotto);
};

export const handlePaymentForm = (event) => {
  event.preventDefault();
  const payment = event.target[0].valueAsNumber;
  event.target[0].value = null;

  buyLotto(payment);
};

export const handleShowNumber = (event) => {
  if (event.target.checked) {
    $lottoContainer.classList.remove("lotto-container-hidden");
  } else {
    $lottoContainer.classList.add("lotto-container-hidden");
  }
};
