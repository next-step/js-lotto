const $paymentForm = document.querySelector('.js-payment-form');
const $lottoCount = document.querySelector('.js-lotto-count');
const $lottoContainer = document.querySelector('.js-lotto-container');
const $lottoToggle = document.querySelector('.js-toggle');

const $resultButton = document.querySelector('.open-result-modal-button');
const $resetButton = document.querySelector('.js-reset-button');
const $lottoSection = document.querySelector('.js-lotto-section');
const $inputLotto = document.querySelector('.js-payment-input');

const $winningNumberForm = document.querySelector(".winning-number-form");
const $winningNumber = document.querySelectorAll('.winning-number ');
const $bonusNumber = document.querySelector('.bonus-number');

const LOTTO_PRICE = 1000;

const $resultContainer = document.querySelector('.result-table');

const $modalCloseButton = document.querySelector('.modal-close');

const $resultPersent = document.querySelector('.js-percent'); 

// 만들고자하는 객체
// {
//   lottoNumbers: [],

//   setLottoNumbers() {},
//   evaluateRank(winnigNumber, bonusNumber) {}
// }

// const getLottoNumber = () => Math.floor(Math.random() * 45) + 1;
// [1,2,3,4,5,6,7,8,9,10]
// 1~10 중 랜덤하게 하나 뽑는다.
// 예를 들어 3을 뽑았다.
// 배열 수정
// a = [1,2] b = [4,5, 6,7,8,9,10]
// [...a, ...b]
// [1,2,4,5,6,7,8,9,10]
// 다시 랜덤하게 뽑는다.
// ... 반복

// 로또 한 장을 발행한다.
const setLotto = (maxNum, minNum) => {
  let baseNumbers = [...Array(maxNum - minNum + 1)].map((_, index) => index + minNum);
  const lottoNumbers = [];
  
  for (let i = 0; i < 6; i++) {
    // 0 <= index < baseNumbers.length
    // Math.random() => 0 <= num < 1
    const randomIndex = Math.floor(Math.random() * baseNumbers.length);
    const lottoNumber = baseNumbers[randomIndex];

    lottoNumbers.push(lottoNumber);
    baseNumbers = [...baseNumbers.slice(0, randomIndex), ...baseNumbers.slice(randomIndex + 1)]
  }
  return lottoNumbers ;
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

class Lotto {
  constructor() {
    this.numbers = [];
    this.rank = {
     "1등": 0,
     "2등": 0,
     "3등": 0,
     "4등": 0,
     "5등": 0,
    };
  }

  // 로또 3장 줘
  // 한장씩 3번 this.numbers에 push한다.
  setNumbers(amount) {
    this.numbers = [];
    for(let i = 0 ; i < amount ; i++ ){
      const lotto = setLotto(45, 1);
      this.numbers.push(lotto);
    }
    console.log(this.numbers); 
  }
// [1,2,3,4,5,6]
  evaluateRank(winnigNumber, bonusNumber) {
    this.rank = {
      "1등": 0,
      "2등": 0,
      "3등": 0,
      "4등": 0,
      "5등": 0,
     };
    // 내 로또 번호랑 winngingNumber랑 몇개나 일치하는지?
    this.numbers.forEach(number => {
      const count = getMatchedNumberCount(number, winnigNumber);
      
      switch (count) {
        case 6 :
          this.rank["1등"]++;
          break;
        case 5 :
          if(number.includes(bonusNumber)) {
            this.rank["2등"]++;
          }
          else {
            this.rank["3등"]++;  
          }
          break;
        case 4 :
          this.rank["4등"]++;  
          break;        
        case 3 :
          this.rank["5등"]++;  
          break;                
        }
      })
  }
}

// 로또 번호와 당첨번호 비교 
function getMatchedNumberCount(nums1 = [] , nums2 = []) {
  let matchNum = 0;
  nums1.forEach(element => {
    if(nums2.includes(element)){
      matchNum++;
    }
  });
  return matchNum;
}

const lotto = new Lotto();

const matchedCountTemplate = (rank) => `
<thead>
<tr class="text-center">
  <th class="p-3">일치 갯수</th>
  <th class="p-3">당첨금</th>
  <th class="p-3">당첨 갯수</th>
</tr>
</thead>
<tbody>
<tr class="text-center">
  <td class="p-3">3개</td>
  <td class="p-3">5,000</td>
  <td class="p-3">${rank["5등"]}개</td>
</tr>
<tr class="text-center">
  <td class="p-3">4개</td>
  <td class="p-3">50,000</td>
  <td class="p-3">${rank["4등"]}개</td>
</tr>
<tr class="text-center">
  <td class="p-3">5개</td>
  <td class="p-3">1,500,000</td>
  <td class="p-3">${rank["3등"]}개</td>
</tr>
<tr class="text-center">
  <td class="p-3">5개 + 보너스볼</td>
  <td class="p-3">30,000,000</td>
  <td class="p-3">${rank["2등"]}개</td>
</tr>
<tr class="text-center">
  <td class="p-3">6개</td>
  <td class="p-3">2,000,000,000</td>
  <td class="p-3">${rank["1등"]}개</td>
</tr>
</tbody>
` 

const lottoTemplate = (lottoNumbers = []) => `
  <div>
    <span class="mx-1 text-4xl js-lotto-ticket">🎟️ </span>
    <span class="js-lotto-numbers">${lottoNumbers.join(', ')}</span>
  </div>
`;

const getAmount = (price) => Math.floor(price / LOTTO_PRICE);

let price;

const handlePayment = (event) => {
  event.preventDefault();

  price = event.target.elements['price'].value;
  
  if(price < 1000) {
    alert('1000원 이상 구매 가능합니다!')
    return;
  }
  if (price % 1000 !== 0){
    alert('1000원 단위로 구매 가능합니다')
    return;
  }

  buyLotto(price);

};

const buyLotto = (price) => {
  const amount = getAmount(price);

  lotto.setNumbers(amount);

  const lottos = lotto.numbers;

  $lottoCount.textContent = amount;
  $lottoContainer.innerHTML = lottos.map(lottoTemplate).join('');

  $lottoSection.style.display = 'block';
};


$paymentForm.addEventListener('submit', handlePayment);

$lottoToggle.addEventListener('change', (event) => {
  const lottoNumberHidden = 'lotto-number-hidden';

  event.target.checked == true ? $lottoContainer.classList.remove(lottoNumberHidden) :  $lottoContainer.classList.add(lottoNumberHidden);
  
});

const modalView = document.querySelector('.js-modal-view');

// 결과 확인 버튼
$resultButton.addEventListener('click', ()=> {
  const winnigNumber = Array.from($winningNumber).map(($input) => Number($input.value));
  const bonusNumber = Number($bonusNumber.value);
  console.log(winnigNumber);
  console.log(bonusNumber);
  lotto.evaluateRank(winnigNumber ,bonusNumber);
  console.log(lotto.rank);


  modalView.classList.add('open');
  $resultContainer.innerHTML = matchedCountTemplate(lotto.rank);
  
  const prize = (lotto.rank["1등"] * 2000000000) + 
                (lotto.rank["2등"] * 30000000) +
                (lotto.rank["3등"] * 1500000) +
                (lotto.rank["4등"] * 50000) + 
                (lotto.rank["5등"] * 5000);
  

  // (이익 / 내가 쓴 돈)
  const prizePercent = (prize/ price).toFixed(2);

  $resultPersent.textContent = `당신의 총 수익률은 ${ prizePercent === NaN ? 0 : prizePercent}%입니다.`;
})

// 다시 시작하기 버튼 
$resetButton.addEventListener('click',()=>{
  modalView.classList.remove('open');
  $lottoSection.style.display = 'none';
  $inputLotto.value = null;
  $winningNumberForm.reset();
})

$modalCloseButton.addEventListener('click',() =>{
  modalView.classList.remove('open');
})

// local step1
// fork setp1
// upstream merge mini
