import LottoGameView from './LottoGameView.js';

class LottoGameViewWeb extends LottoGameView {
  constructor() {
    super();
  }

  printPurchasedLottos(purchasedLottoList) {
    const lottoAmount = purchasedLottoList.length;

    // 구매한 갯수 출력
    const view = document.getElementById('purchased-amount-view');
    const message = `총 ${lottoAmount}개를 구매하였습니다.`;
    view.textContent = message;

    // 로또 이미지, 로또 번호 출력
    const lottoWrapper = document.getElementById('ticket-image-wrapper');
    purchasedLottoList.forEach((lotto) => {
      const { selectedNums, extraNum } = lotto.numbers;
      const numbers = [...selectedNums, extraNum].sort((a, b) => a - b);

      const ticketWrapper = document.createElement('div');
      ticketWrapper.className = 'd-flex items-center';

      const ticketElement = document.createElement('span');
      ticketElement.className = 'mx-1 text-4xl';
      ticketElement.textContent = '🎟️';

      const numberElement = document.createElement('span');
      numberElement.className = 'mx-1 text-base';
      numberElement.textContent = numbers.join(', ');

      ticketWrapper.append(ticketElement, numberElement);
      // FIXME: 로또는 한 번에 여러개 발행 가능하고, 여러번 여러개 발행은 불가능하다.
      lottoWrapper.replaceChildren();
      lottoWrapper.append(ticketWrapper);
    });
  }

  printResult(result) {
    console.log(result);
    // 결과 출력
    const threeEl = document.querySelector('#match-three');
    const fourEl = document.querySelector('#match-four');
    const fiveEl = document.querySelector('#match-five');
    const extraEl = document.querySelector('#match-extra');
    const sixEl = document.querySelector('#match-six');

    threeEl.textContent = result[3] + '개';
    fourEl.textContent = result[4] + '개';
    fiveEl.textContent = result[5] + '개';
    extraEl.textContent = result[5.5] + '개';
    sixEl.textContent = result[6] + '개';

    const profitRateEl = document.querySelector('#profit-rate');
    profitRateEl.textContent = `당신의 총 수익률은 ${result.profitRate}%입니다.`;
  }
}

export default LottoGameViewWeb;
