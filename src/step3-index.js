import Lotto from "./js/lotto";
import {RESULT_MESSAGE, INPUT_NUMBER_LENGTH} from './js/constants'
import { inputElement,buttonElement,resultElement,showLottoNumbers,lottoListEl,winningNumbers,bonusNumber,openResult,restartBtn,rateResult } from "./js/selector";

buttonElement.addEventListener('click', () => {
  const inputValue = inputElement.value;
  Lotto.getLottoPurchaseAmount(inputValue);
  resultElement.textContent = RESULT_MESSAGE.PURCHASE(Lotto.numLottos);
});

showLottoNumbers.addEventListener('change', () => {
  lottoListEl.textContent = Lotto.lottos;
});

winningNumbers.forEach(function(input) {
  input.addEventListener('input', function() {
      if (this.value.length > INPUT_NUMBER_LENGTH) {
          this.value = this.value.slice(0, INPUT_NUMBER_LENGTH);
      }
  });
});

bonusNumber.addEventListener('input', function() {
  if (this.value.length > INPUT_NUMBER_LENGTH) {
      this.value = this.value.slice(0, INPUT_NUMBER_LENGTH);
  }
});

openResult.addEventListener('click', function() {
  let hasEmptyField = false;
  let winningNumberList = [];
  
  winningNumbers.forEach(function(input) {
      if (input.value === '') {
          hasEmptyField = true;
          return;
      } else {
        winningNumberList.push(Number(input.value))
      }
  });
  if (hasEmptyField || bonusNumber.value === '') {
      alert(RESULT_MESSAGE.INPUT);
  } else {
    Lotto.matchedRank(winningNumberList, bonusNumber.value)

    const tableBody = document.getElementById('tableBody');
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    Lotto.prize.forEach(function(item) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-3">${item.rank}</td>
            <td class="p-3">${item.text}</td>
            <td class="p-3">${item.count}</td>
        `;
        tableBody.appendChild(row);
    });
    rateResult.textContent = RESULT_MESSAGE.RESULT_RATE(Lotto.profitPercentage);
  }
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
});

restartBtn.addEventListener('click', () => {
  location.reload(); 
});