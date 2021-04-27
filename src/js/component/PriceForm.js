import SETTINGS from '../settings.js';

const PriceForm = (_ => {
  return $el => {
    const bindEvent = $el => {};

    const render = $el => {
      $el.innerHTML = `
        <label class="mb-2 d-inline-block"
          >구입할 금액을 입력해주세요.
        </label>
        <div class="d-flex">
          <input
            type="number"
            class="w-100 mr-2 pl-2"
            placeholder="구입 금액"
          />
          <button type="button" class="btn btn-cyan">확인</button>
        </div>
      `;
    };

    render($el);
    bindEvent($el);
  };
})(SETTINGS);

export default PriceForm;
