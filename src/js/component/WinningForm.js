import SETTINGS from '../settings.js';

const WinningForm = (_ => {
  return $el => {
    const bindEvent = $el => {};

    const render = $el => {
      $el.innerHTML = `
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
      `;
    };

    render($el);
    bindEvent($el);
  };
})(SETTINGS);

export default WinningForm;
