/**
 * step 3의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoMachine from './domain/LottoMachine';

console.log('Web Browser!');

const confirmButton = document.getElementById('confirmButton');
const inputPrice = document.getElementById('price');
const toggleShowNumber = document.querySelector('.lotto-numbers-toggle-button');
const lottoNumbersDiv = document.querySelector('.lotto-numbers');

const purchaseMessage = document.getElementById('purchase_message');
const machine = new LottoMachine();
let lottos = [];

function handleGetPrice() {
  const { value } = inputPrice;
}

function handleClickConfirm() {
  const { value } = inputPrice;
  lottos = machine.createLottos(value);

  purchaseMessage.innerText = `${lottos.length}개 구매하였습니다.`;
}

function toggleLottoNumbers() {
  if (lottoNumbersDiv.style.display === 'none') {
    lottoNumbersDiv.style.display = 'block'; // 요소 보이기
    displayLottoTickets();
  } else {
    lottoNumbersDiv.style.display = 'none'; // 요소 숨기기
    lottoNumbersDiv.innerHTML = '';
  }
}

function displayLottoTickets() {
  lottoNumbersDiv.innerHTML = ''; // 기존 티켓을 지우고 새로 시작
  lottos.forEach((lotto) => {
    const span = document.createElement('span');
    span.className = 'mx-1 text-4xl';
    span.textContent = `🎟️ ${lotto.numbers}`;
    lottoNumbersDiv.appendChild(span);
  });
}

inputPrice.addEventListener('input', handleGetPrice);
confirmButton.addEventListener('click', handleClickConfirm);

toggleShowNumber.addEventListener('click', toggleLottoNumbers);
