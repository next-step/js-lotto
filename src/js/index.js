import executeEvent from './executeEvent.js';

function init() {
  const purchaseList = document.querySelector('section.mt-9');
  const winningNumberForm = document.getElementById('winning-number-form');
  const purchaseInput = document.querySelector('.purchase-input');
  
  purchaseList.style.display = 'none';
  winningNumberForm.style.display = 'none';
  purchaseInput.focus();
  executeEvent();
}

window.addEventListener('load', () => init());
