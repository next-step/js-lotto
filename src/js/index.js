const $paymentForm = document.querySelector('.js-payment-form');
const $lottoCount = document.querySelector('.js-lotto-count');
const $lottoContainer = document.querySelector('.js-lotto-container');
const $lottoToggle = document.querySelector('.js-toggle');

const LOTTO_PRICE = 1000;

const lottoTemplate = (lottoNumbers = []) => `
  <div>
    <span class="mx-1 text-4xl js-lotto-ticket">🎟️ </span>
    <span class="js-lotto-numbers">${lottoNumbers.join(', ')}</span>
  </div>
`;

const getAmount = (price) => Math.floor(price / LOTTO_PRICE);

const getLottoNumber = () => Math.floor(Math.random() * 45) + 1;

// 로또 한 장을 발행한다.
const issueLotto = () => {
  const lottoNumbers = [];

  for (let i = 0; i < 6; i++) {
    const lottoNumber = getLottoNumber();
    lottoNumbers.push(lottoNumber);
  }
  return lottoNumbers;
};

// 로또를 전달받은 개수만큼 발행한다.
const issueLottos = (amount) => {
  const lottos = [];

  for (let i = 0; i < amount; i++) {
    const lotto = issueLotto();
    lottos.push(lotto);
  }

  return lottos;
};

const buyLotto = (price) => {
  const amount = getAmount(price);

  const lottos = issueLottos(amount);

  $lottoCount.textContent = amount;
  $lottoContainer.innerHTML = lottos.map(lottoTemplate).join('');
};

const handlePayment = (event) => {
  event.preventDefault();

  const price = event.target.elements['price'].value;

  buyLotto(price);
};

$paymentForm.addEventListener('submit', handlePayment);

$lottoToggle.addEventListener('change', (event) => {
  const lottoNumberHidden = 'lotto-number-hidden';

  if (event.target.checked) {
    $lottoContainer.classList.remove(lottoNumberHidden);
  } else {
    $lottoContainer.classList.add(lottoNumberHidden);
  }
});
