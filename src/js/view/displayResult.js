import getRateOfReturn from '../model/getRateOfReturn.js';

function displayResult(result) {
  const wins_3 = document.querySelector('.matche-3');
  const wins_4 = document.querySelector('.matche-4');
  const wins_5 = document.querySelector('.matche-5');
  const wins_5_bonus = document.querySelector('.matche-5-bonus');
  const wins_6 = document.querySelector('.matche-6');
  const rateOfReturn = document.querySelector('.rate-of-return');

  wins_3.innerText = `${result.three}개`;
  wins_4.innerText = `${result.four}개`;
  wins_5.innerText = `${result.five}개`;
  wins_5_bonus.innerText = `${result.five_bonus}개`;
  wins_6.innerText = `${result.six}개`;
  rateOfReturn.innerText = `당신의 총 수익률은 ${getRateOfReturn(result)}% 입니다.`;
}

export default displayResult;