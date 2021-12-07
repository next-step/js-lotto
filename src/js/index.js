import {matchedCountTemplate , lottoTemplate } from "./template.js"

const $paymentForm = document.querySelector('.js-payment-form');
const $lottoCount = document.querySelector('.js-lotto-count');
const $lottoContainer = document.querySelector('.js-lotto-container');
const $lottoToggle = document.querySelector('.js-toggle');

const $resultButton = document.querySelector('.open-result-modal-button');
const $resetButton = document.querySelector('.js-reset-button');
const $lottoSection = document.querySelector('.js-lotto-section');
const $inputLotto = document.querySelector('.js-payment-input');



const $winningNumberForm = document.querySelector(".winning-number-form");
const $winningNumber = document.querySelectorAll('.winning-number');
const $bonusNumber = document.querySelector('.bonus-number');

const LOTTO_PRICE = 1000;

const $resultContainer = document.querySelector('.result-table');

const $modalCloseButton = document.querySelector('.modal-close');

const $resultPersent = document.querySelector('.js-percent'); 

// 구매가능 로또수
const $remainLottoCount = document.querySelector('.js-remain-lotto-count'); 

// 자동구매 버튼 
const $autoLottoButton = document.querySelector('.js-automatic-buy-button');



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
    this.amount = 0;
    this.remainAmount = 0;
    this.numbers = [];
    this.rank = {
     "1등": 0,
     "2등": 0,
     "3등": 0,
     "4등": 0,
     "5등": 0,
    };
  }

  // 전체 갯수 
  setAmount(price) {
    this.remainAmount = Math.floor(price / LOTTO_PRICE);
    this.setRemainLottCountView();
  }

  setManualNumber(manualLottoNumber) {
    if (this.remainAmount === 0) {
      alert("더 이상 구매할 수 없습니다.");

      return;
    }

    const hasDuplicatedNumber = new Set(manualLottoNumber).size !== manualLottoNumber.length;

    if (hasDuplicatedNumber) {
      alert("중복된 숫자는 입력할 수 없습니다.");
      return;
    }

    this.numbers.push(manualLottoNumber);
    this.remainAmount--;
    this.amount++;

    this.setRemainLottCountView();
    this.setLottoSectionView();
  }

  // 로또 3장 줘
  // 한장씩 3번 this.numbers에 push한다.
  
  setAutoNumbers() {
    for(let i = 0 ; i < this.remainAmount ; i++ ){
      const lotto = setLotto(45, 1);
      this.numbers.push(lotto);
    }

    this.amount = this.amount + this.remainAmount;
    this.remainAmount = 0;

    this.setRemainLottCountView();
    this.setLottoSectionView();
  }

  setRemainLottCountView() {
    $remainLottoCount.textContent = this.remainAmount;
  }

  setLottoSectionView() {
    $lottoCount.textContent = this.amount; // 구입한 개수를 업데이트
    // 현재까지 구입한 로또 번호(티켓이미지)를 업데이트
    $lottoContainer.innerHTML = this.numbers.map(lottoTemplate).join('');
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

// const matchedCountTemplate = (rank) => `
// <thead>
// <tr class="text-center">
//   <th class="p-3">일치 갯수</th>
//   <th class="p-3">당첨금</th>
//   <th class="p-3">당첨 갯수</th>
// </tr>
// </thead>
// <tbody>
// <tr class="text-center">
//   <td class="p-3">3개</td>
//   <td class="p-3">5,000</td>
//   <td class="p-3">${rank["5등"]}개</td>
// </tr>
// <tr class="text-center">
//   <td class="p-3">4개</td>
//   <td class="p-3">50,000</td>
//   <td class="p-3">${rank["4등"]}개</td>
// </tr>
// <tr class="text-center">
//   <td class="p-3">5개</td>
//   <td class="p-3">1,500,000</td>
//   <td class="p-3">${rank["3등"]}개</td>
// </tr>
// <tr class="text-center">
//   <td class="p-3">5개 + 보너스볼</td>
//   <td class="p-3">30,000,000</td>
//   <td class="p-3">${rank["2등"]}개</td>
// </tr>
// <tr class="text-center">
//   <td class="p-3">6개</td>
//   <td class="p-3">2,000,000,000</td>
//   <td class="p-3">${rank["1등"]}개</td>
// </tr>
// </tbody>
// ` 

// const lottoTemplate = (lottoNumbers = []) => `
//   <div>
//     <span class="mx-1 text-4xl js-lotto-ticket">🎟️ </span>
//     <span class="js-lotto-numbers">${lottoNumbers.join(', ')}</span>
//   </div>
// `;

const getAmount = (price) => Math.floor(price / LOTTO_PRICE);

let price;

// 확인 버튼 클릭 시 
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

  lotto.setAmount(price);
  $lottoSection.style.display = 'block';
};

const buyLotto = (price) => {
  const amount = getAmount(price);

  lotto.setNumbers(amount);

  const lottos = lotto.numbers;
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
  
  const allNumber = [];
  for (let i = 0 ; i < winnigNumber.length ; i ++){
    if(winnigNumber[i] > 45){
      alert('45까지 입력 가능합니다');
      return;
    }
    else if (winnigNumber[i] === 0){
      alert('공백 및 0은 입력이 안됩니다.');
      return;
    }
    else if(winnigNumber[i] > 0 || winnigNumber[i] < 46){
      allNumber.push(winnigNumber[i]);
    }
  }

  if(bonusNumber > 45){
    alert('45까지 입력 가능합니다');
    return;
  }
  else if (bonusNumber <= 45 ){
    allNumber.push(bonusNumber);
  }
  const setWinning = new Set(allNumber);

  if(allNumber.length !== setWinning.size){
    alert('중복된 숫자가 존재합니다');
    return;
  }    
  
  lotto.evaluateRank(winnigNumber ,bonusNumber);
  
  modalView.classList.add('open');
  $resultContainer.innerHTML = matchedCountTemplate(lotto.rank);

  const priceRank = {
    prize_money_1 : 2000000000,
    prize_money_2 : 30000000,
    prize_money_3 : 1500000,
    prize_money_4 : 50000,
    prize_money_5 : 5000
  }
  
  const prize = (lotto.rank["1등"] * priceRank.prize_money_1) + 
                (lotto.rank["2등"] * priceRank.prize_money_2) +
                (lotto.rank["3등"] * priceRank.prize_money_3) +
                (lotto.rank["4등"] * priceRank.prize_money_4) + 
                (lotto.rank["5등"] * priceRank.prize_money_5);
  

  // (이익 - 내가 쓴 돈 / 내가 쓴 돈)

  const prizePercent = ((prize - price )/price).toFixed(2);

  $resultPersent.textContent = `당신의 총 수익률은 ${ prizePercent === NaN || prizePercent  < 0? 0 : prizePercent}%입니다.`;
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

const $manualForm = document.querySelector('.js-manual-form');
const $manualNumberForm = document.querySelector(".js-manual-form");

// 수동 구매버튼 클릭 
const $manualButton = document.querySelector('.js-manual-buy-button');

// FormEvent
// 확인 버튼 클릭시 
const manualPayment = (event) =>{
  event.preventDefault();

  const $manualNumberForm = event.target;
  const $manualNumberInputs = $manualNumberForm.elements["manual-number"];
  const result = Array.from($manualNumberInputs).map((input) => Number(input.value));
  

  lotto.setManualNumber(result);

  $manualNumberForm.reset();  
}



// 수동 구매할 곳 입력
$manualForm.addEventListener('submit', manualPayment);

$autoLottoButton.addEventListener('click', () => lotto.setAutoNumbers());
