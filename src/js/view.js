import { showElement, hideElement, setValue, setClass } from './element.js';

export const addLottoDetail = (element) => {
  element.innerHTML += template;
};

export const renderLotto = ($lottoList, lottos) => {
  renderNumber(lottos.length);
  for (const lotto of lottos) {
    const li = lottoLi(lotto);
    $lottoList.appendChild(li);
  }
};

const renderNumber = (number) => {
  const $numberLabel = document.querySelector('.number-label');
  setValue($numberLabel, `총 ${number}개를 구매하였습니다.`);
};

const lottoLi = (lotto) => {
  const li = lottoItemLi();
  const iconSpan = lottoIconSpan();
  const numberSpan = lottoNumberSpan(lotto);
  li.appendChild(iconSpan);
  li.appendChild(numberSpan);
  return li;
};

const lottoItemLi = () => {
  const li = document.createElement('li');
  setClass(li, 'lotto-item');
  return li;
};

const lottoIconSpan = () => {
  const iconSpan = document.createElement('span');
  setClass(iconSpan, 'lotto-icon');
  setValue(iconSpan, `🎟️ `);
  return iconSpan;
};

const lottoNumberSpan = (lotto) => {
  const numberSpan = document.createElement('span');
  setClass(numberSpan, 'lotto-numbers');
  hideElement(numberSpan);
  setValue(numberSpan, lotto.join(', '));
  return numberSpan;
};

export const handleToggle = () => {
  const $lottoList = document.getElementById('lotto-list');
  $lottoList.classList.toggle('flex-col');
  const isToggleOn = $lottoList.classList.contains('flex-col');

  handleFlexDirection($lottoList, isToggleOn);
  handleShowNumbers(isToggleOn);
};

const handleFlexDirection = ($element, isToggleOn) => {
  if (isToggleOn) {
    $element.style.flexDirection = 'column';
  } else {
    $element.style.flexDirection = 'row';
  }
};

const handleShowNumbers = (isToggleOn) => {
  const numbers = document.querySelectorAll('.lotto-numbers');
  for (const number of numbers) {
    if (isToggleOn) {
      showElement(number);
    } else {
      hideElement(number);
    }
  }
};

const template = `
    <div class="lotto-detail">
<section class="mt-9">
  <div class="d-flex">
    <label class="number-label flex-auto my-0"></label>
    <div class="flex-auto d-flex justify-end pr-1">
      <label class="switch">
        <input type="checkbox" class="lotto-numbers-toggle-button" />
        <span class="text-base font-normal">번호보기</span>
      </label>
    </div>
  </div>
  <ul id="lotto-list" class="d-flex flex-wrap">
  </ul>
</section>
<form class="mt-9">
  <label class="flex-auto d-inline-block mb-3"
    >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
  >
  <div class="d-flex">
    <div>
      <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
      <div>
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
        />
      </div>
    </div>
    <div class="bonus-number-container flex-grow">
      <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
      <div class="d-flex justify-center">
        <input type="number" class="bonus-number text-center" />
      </div>
    </div>
  </div>
  <button
    type="button"
    class="open-result-modal-button mt-5 btn btn-cyan w-100"
  >
    결과 확인하기
  </button>
</form>
</div>
    `;
