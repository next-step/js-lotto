import { setValue } from './element.js';

export const renderLottoDetail = (lottos) => {
  renderLottoDetailTemplate();
  renderLottoNumbers(lottos.length);
  renderLottoLists(lottos);
};

const renderLottoDetailTemplate = () => {
  const $lottoDetail = document.querySelector('.lotto-detail');
  $lottoDetail.innerHTML = template;
};

const renderLottoNumbers = (number) => {
  const $numberLabel = document.querySelector('.number-label');
  setValue($numberLabel, `총 ${number}개를 구매하였습니다.`);
};

export const handleToggle = (lottos) => {
  const toggle = document.querySelector('.number-toggle');
  const isToggleOn = toggle.classList.toggle('on');

  renderLottoLists(lottos, isToggleOn);
  handleFlexDirection(isToggleOn);
};

const handleFlexDirection = (isToggleOn) => {
  const $lottoList = document.querySelector('#lotto-list');
  if (isToggleOn) {
    $lottoList.style.flexDirection = 'column';
  } else {
    $lottoList.style.flexDirection = 'row';
  }
};

const renderLottoLists = (lottos, isToggleOn) => {
  const $lottoList = document.querySelector('#lotto-list');
  $lottoList.innerHTML = lottoList(lottos, isToggleOn);
};

const lottoList = (lottos, isToggleOn) => {
  return lottos.map((lotto) => lottoItem(lotto, isToggleOn)).join('');
};

const lottoItem = (lotto, isToggleOn) => {
  const lottoNumbers = lotto.join(', ');
  const display = isToggleOn ? 'block' : 'none';
  return `
<li class="lotto-item">
  <span class="lotto-icon">🎟️  </span>
  <span class="lotto-numbers" style="display: ${display};">${lottoNumbers}</span>
</li>
`;
};

const template = `
<section class="mt-9">
  <div class="d-flex">
    <label class="number-label flex-auto my-0"></label>
    <div class="flex-auto d-flex justify-end pr-1">
      <label class="switch">
        <input type="checkbox" class="lotto-numbers-toggle-button" />
        <span class="number-toggle text-base font-normal">번호보기</span>
      </label>
    </div>
  </div>
  <ul id="lotto-list" class="d-flex flex-wrap">
  </ul>
</section>
<form class="winning-form mt-9">
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
          min="1"
          max="45"
          maxlength="2"
          required
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
          min="1"
          max="45"
          maxlength="2"
          required
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
          min="1"
          max="45"
          maxlength="2"
          required
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
          min="1"
          max="45"
          maxlength="2"
          required
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
          min="1"
          max="45"
          maxlength="2"
          required
        />
        <input
          type="number"
          class="winning-number mx-1 text-center"
          min="1"
          max="45"
          maxlength="2"
          required
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
    type="submit"
    class="open-result-modal-button mt-5 btn btn-cyan w-100"
  >
    결과 확인하기
  </button>
</form>
    `;
