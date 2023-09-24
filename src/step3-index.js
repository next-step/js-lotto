import LottoGameViewWeb from './js/ui/LottoGameViewWeb.js';
import LottoGameController from './js/ui/LottoGameController.js';

class App {
  #view;
  #controller;

  constructor() {
    this.#view = new LottoGameViewWeb();
    this.#controller = new LottoGameController();
  }

  run() {
    try {
      this.step1();
      this.step2();
      /**
       * TODO:
       * 당첨 통계에 올바른 결과 표시하기
       * 다시 시작하기, 모달 닫기 바인딩
       * 메소드 내의 이벤트 바인딩, 이벤트 콜백함수 분리하기
       */
    } catch (error) {
      alert(error.message);
    }
  }

  /**
   * 구매 버튼을 클릭해 유저가 입력한 금액만큼 로또를 발행한다.
   */
  step1() {
    const $purchaseButton = document.getElementById('purchase-button');
    const $purchaseInput = document.getElementById('purchase-amount-input');

    $purchaseButton.addEventListener('click', () => {
      const purchaseAmount = $purchaseInput.value;

      this.#controller
        .purchaseAndIssueLottos(purchaseAmount)
        .then(() =>
          this.#view.printPurchasedLottos(this.#controller.purchasedLottoList)
        )
        .catch((error) => alert(error.message));
    });
  }

  /**
   * 유저가 입력한 당첨 번호, 보너스 번호를 바탕으로 당첨 결과를 확인한다.
   */
  step2() {
    const $openResultButton = document.querySelector(
      '.open-result-modal-button'
    );
    const $resultModal = document.querySelector('.modal');
    const $selectedNumsInput = document.querySelectorAll('.selected-number');
    const $extraNumInput = document.querySelector('.bonus-number');

    $openResultButton.addEventListener('click', () => {
      const selectedNums = Array.from($selectedNumsInput).map(
        (input) => input.valueAsNumber
      );
      const extraNum = Number($extraNumInput.valueAsNumber);

      this.#controller
        .setWinningNumbers({ selectedNums, extraNum })
        .then(() => {
          this.#controller.calculateResults();
          $resultModal.classList.add('open');
        })
        .catch((error) => alert(error.message));
    });
  }
}

new App().run();
