import Lotto from "./js/lotto";
import {RESULT_MESSAGE} from './js/constants'
import { inputElement,buttonElement,resultElement,showLottoNumbers,lottoListEl,winningNumbers,bonusNumber,openResult,restartBtn,rateResult } from "./js/selector";

// button 클릭 이벤트 핸들러를 정의합니다.
buttonElement.addEventListener('click', () => {
  // input 요소의 값을 가져와서 result 요소에 표시합니다.
  const inputValue = inputElement.value;
  Lotto.getLottoPurchaseAmount(inputValue);
  resultElement.textContent = RESULT_MESSAGE.PURCHASE(Lotto.numLottos);
});
showLottoNumbers.addEventListener('change', () => {
  lottoListEl.textContent = Lotto.lottos;
});
winningNumbers.forEach(function(input) {
  input.addEventListener('input', function() {
      if (this.value.length > 1) {
          this.value = this.value.slice(0, 1);
      }
  });
});
bonusNumber.addEventListener('input', function() {
  if (this.value.length > 1) {
      this.value = this.value.slice(0, 1);
  }
});
openResult.addEventListener('click', function() {
  var hasEmptyField = false;

  winningNumbers.forEach(function(input) {
      if (input.value === '') {
          hasEmptyField = true;
          return;
      }
  });
  if (hasEmptyField || bonusNumber.value === '') {
      alert('모든 필드에 값을 입력해주세요.');
  } else {
    Lotto.matchedRank(winningNumbers.value, bonusNumber.value)

    const tableBody = document.getElementById('tableBody');

    Lotto.prize.forEach(function(item) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-3">${item.rank}</td>
            <td class="p-3">${item.prize}</td>
            <td class="p-3">${item.count}</td>
        `;
        tableBody.appendChild(row);
    });
  }
});
restartBtn.addEventListener('click', () => {
  location.reload(); 
});