import SETTINGS from '../settings.js';

const PurchaseDetails = (_ => {
  return $el => {
    const bindEvent = $el => {};

    const render = $el => {
      $el.innerHTML = `
        <div class="d-flex">
          <label class="flex-auto my-0">총 5개를 구매하였습니다.</label>
          <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
              <input type="checkbox" class="lotto-numbers-toggle-button" />
              <span class="text-base font-normal">번호보기</span>
            </label>
          </div>
        </div>
        <div class="d-flex flex-wrap">
          <span class="mx-1 text-4xl">🎟️ </span>
          <span class="mx-1 text-4xl">🎟️ </span>
          <span class="mx-1 text-4xl">🎟️ </span>
          <span class="mx-1 text-4xl">🎟️ </span>
          <span class="mx-1 text-4xl">🎟️ </span>
        </div>
      `;
    };

    render($el);
    bindEvent($el);
  };
})(SETTINGS);

export default PurchaseDetails;
