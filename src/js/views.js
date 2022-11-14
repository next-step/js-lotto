const $purchasedLottoList = document.querySelector('#purchasedLottoList');
const $winningNumberInputs = document.querySelector('#winningNumberInputs');
const $modal = document.querySelector('.modal');

const displayDetails = (quantity) => {
  if (!quantity) {
    $purchasedLottoList.style.display = 'none';
    $winningNumberInputs.style.display = 'none';
    return;
  }
  $purchasedLottoList.style.display = 'block';
  $winningNumberInputs.style.display = 'block';
};

const openModal = () => {
  $modal.classList.add('open');
};

const closeModal = () => {
  $modal.classList.remove('open');
};

export { displayDetails, openModal, closeModal };
