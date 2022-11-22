const $purchasedLottoList = document.querySelector('#purchasedLottoList');
const $winningNumberInputs = document.querySelector('#winningNumberInputs');
const $lottoIconList = document.querySelector('#lottoIconList');
const $totalQuantity = document.querySelector('#totalQuantity');
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

const handleToggle = (lottoState) => {
  const $lottoNumbers = document.querySelectorAll('.lotto-numbers');
  if (!lottoState.isOpen) {
    $lottoIconList.style.flexDirection = 'column';
    $lottoNumbers.forEach((el) => {
      el.style.display = 'inline';
    });
    lottoState.setIsOpen(true);
    return;
  }
  $lottoIconList.style.flexDirection = 'row';
  $lottoNumbers.forEach((el) => {
    el.style.display = 'none';
  });
  lottoState.setIsOpen(false);
};

const renderLottoIcons = (lottoState) => {
  if (!lottoState.quantity || !lottoState.lottos.length) return;
  $lottoIconList.innerHTML = lottoState.lottos
    .map((lotto) => {
      return `
    <li class="mx-1 text-4xl d-flex">
      <div class="lotto-item">🎟️</div>
      <div class="lotto-numbers">
        ${lotto.winningNumbers.join(', ')}
      </div>
    </li>`;
    })
    .join('');
};

const resetLottoIcons = () => {
  $lottoIconList.innerHTML = '';
};

const renderTotalQuantity = (quantity) => {
  $totalQuantity.innerText = quantity;
};

const renderDrawLottoResult = (places) => {
  Object.values(places).forEach((place, idx) => {
    document.querySelector(`#place${idx + 1}`).textContent = place;
  });
};
const renderProfitRatio = (ratio) => {
  document.querySelector('#profitRatio').textContent = ratio;
};

export {
  displayDetails,
  openModal,
  closeModal,
  handleToggle,
  renderLottoIcons,
  renderTotalQuantity,
  resetLottoIcons,
  renderDrawLottoResult,
  renderProfitRatio,
};
