function replay() {
  const purchaseInput = document.querySelector('.purchase-input');
  const showNumberInput = document.querySelector('.show-number-input');
  const purchaseList = document.querySelector('section.mt-9');
  const winningNumbers = document.querySelectorAll('.winning-number');
  const bonusNumber = document.querySelector('.bonus-number');
  const winningNumberForm = document.getElementById('winning-number-form');

  purchaseInput.value = '';
  purchaseInput.focus();
  showNumberInput.checked = false;
  purchaseList.style.display = 'none';
  winningNumbers.forEach((it) => it.value = '');
  bonusNumber.value = '';
  winningNumberForm.style.display = 'none';
}

export default replay;