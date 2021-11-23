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
const setLotto = () => {
  const lottoNumbers = [];
  
  for (let i = 0; i < 6; i++) {
    const lottoNumber = getLottoNumber();
    lottoNumbers.push(lottoNumber);
  }
  return lottoNumbers;
};

// 로또를 전달받은 개수만큼 발행한다.
const setLottos = (amount) => {
  const lottos = [];

  for (let i = 0; i < amount; i++) {
    const lotto = setLotto();
    lottos.push(lotto);
  }

  return lottos;
};

const handlePayment = (event) => {
  event.preventDefault();

  const price = event.target.elements['price'].value;
  
  if(price < 1000) {
    alert('1000원 이상 구매 가능합니다!')
    return;
  }

  buyLotto(price);
};

const buyLotto = (price) => {
  const amount = getAmount(price);
  const lottos = setLottos(amount);

  $lottoCount.textContent = amount;
  $lottoContainer.innerHTML = lottos.map(lottoTemplate).join('');
};


$paymentForm.addEventListener('submit', handlePayment);

$lottoToggle.addEventListener('change', (event) => {
  const lottoNumberHidden = 'lotto-number-hidden';

  event.target.checked == true ? $lottoContainer.classList.remove(lottoNumberHidden) :  $lottoContainer.classList.add(lottoNumberHidden);
  
});
