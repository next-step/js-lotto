import {$} from "./utils.js";
const $lottoContainer = $(".lotto-container");
const $lottoCounter = $(".lotto-amount");

const countLotto = (number) => {
  if (!number) return;

  $lottoCounter.innerText = number;
};

const issueLotto = (number) => {
  if (!number) return;

  Array(number)
    .fill(0)
    .forEach((_) => {
      $lottoContainer.innerHTML += `<span class="mx-1 text-4xl">🎟️ </span>`;
    });
};

const buyLotto = (payment) => {
  const LOTTO_PRICE = 1000;
  const numberOfLotto = Math.floor(payment / LOTTO_PRICE);

  $lottoContainer.innerHTML = null;

  issueLotto(numberOfLotto);
  countLotto(numberOfLotto);
};

export const handlePaymentForm = (event) => {
  event.preventDefault();
  const payment = event.target[0].valueAsNumber;
  event.target[0].value = null; // 초기화

  buyLotto(payment); // 구입한 lotto 수를 알려줌.
};
