import LottoService from '../../../services/Lotto.service.js';
import LottoList from '../../lottoList/LottoList.js';
import LottoCheck from '../../lottoCheck/LottoCheck.js';
import {
  $,
  $all,
  $elements,
  $close,
  $handleDOMError,
  $allElementProp,
  $removeClass,
} from '../../../helper/index.js';

export const closeLottoManualPurchaseModal = event => {
  event.preventDefault();
  event.stopPropagation();
  if (!event.target.matches('.modal-close')) return;

  $close();
};

export const purchaseCountInput = ({ target: _button }) => {
  if (!_button.matches('[data-props="purchase-count-button"]')) return;

  const $purchaseCountInput = $('[data-props="purchase-count-input"]');
  const $manualPurchaseForm = $('[data-props="manual-purchase-form"]');
  try {
    const count = $purchaseCountInput.valueAsNumber;
    if (count === 0) {
      showLottoSection([]);
      return $close();
    }
    LottoService.isValidCount(count);
    $manualPurchaseForm.replaceChildren(createManualPurchaseFormContent(count));
  } catch (error) {
    $handleDOMError({ $purchaseCountInput, isReset: true, error });
  }
};

export const purchaseConfirm = ({ target: _button }) => {
  if (!_button.matches('.manual-purchase-confirm-button')) return;

  try {
    showLottoSection(checkPurchaseLotto());
    $close();
  } catch (error) {
    $handleDOMError({ error });
  }
};

function createManualPurchaseFormContent(count) {
  return $elements(
    /*html*/
    `<div><div class="scroll-area p-5">
        ${Array.from({ length: count })
          .map(
            (item, index) => /*html*/ `
        <div class="d-flex mb-3" data-props="lotto-purchase-numbers">
          <div>
            <h4 class="mt-0 mb-3 text-center">${index + 1}장🎫</h4>
          </div>
          <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div class="py-1">
              <input type="number" class="purchase-number mx-1 text-center" />
              <input type="number" class="purchase-number mx-1 text-center" />
              <input type="number" class="purchase-number mx-1 text-center" />
              <input type="number" class="purchase-number mx-1 text-center" />
              <input type="number" class="purchase-number mx-1 text-center" />
              <input type="number" class="purchase-number mx-1 text-center" />
            </div>
          </div>
          <div class="bonus-number-container flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            <div class="d-flex py-1 justify-center">
              <input type="number" class="purchase-number bonus-number text-center" />
            </div>
          </div>
        </div>`,
          )
          .join('')}
      </div>
      <button
        type="button"
        class="manual-purchase-confirm-button mt-5 btn btn-cyan w-100"
      >
        확인
      </button></div>`,
  );
}

function checkPurchaseLotto() {
  return Array.from($all('[data-props="lotto-purchase-numbers"]')).map($element =>
    LottoService.checkLottery($allElementProp('.purchase-number', 'value', $element)),
  );
}

function showLottoSection(checkedPurchaseLotto) {
  const $lottoSection = $('.lotto-section');
  const $lottoList = LottoList(checkedPurchaseLotto);
  const $lottoCheck = LottoCheck();
  $lottoSection.replaceChildren($lottoList, $lottoCheck);
  $removeClass($lottoSection, 'hidden');
}
