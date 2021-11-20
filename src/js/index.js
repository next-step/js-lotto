const $paymentForm = document.querySelector('.js-payment-form');
const $lottoCount = document.querySelector('.js-lotto-count');
const $lottoContainer = document.querySelector('.js-lotto-container');

const LOTTO_PRICE = 1000;

const lottoTemplate = '<span class="mx-1 text-4xl js-lotto-ticket">🎟️ </span>';

const getAmount = (price) => Math.floor(price / LOTTO_PRICE);

const buyLotto = (price) => {
  const amount = getAmount(price);

  $lottoCount.textContent = amount;
  $lottoContainer.innerHTML = lottoTemplate.repeat(amount);
};

const handlePayment = (event) => {
  event.preventDefault();

  const price = event.target.elements['price'].value;

  buyLotto(price);
};

$paymentForm.addEventListener('submit', handlePayment);
