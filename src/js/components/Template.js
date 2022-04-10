import { getPriceRate } from '../domains/index.js';

export const getModalTemplate = ({ rankBoard, price }) => {
  const rateToReturn = getPriceRate(price, rankBoard) ?? 0;

  return `
      <div class="modal-inner p-10">
        <div class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </div>

        <h2 class="text-center">🏆 당첨 통계 🏆</h2>
        <div class="d-flex justify-center">
          <table class="result-table border-collapse border border-black">
            <thead>
              <tr class="text-center">
                <th class="p-3">일치 갯수</th>
                <th class="p-3">당첨금</th>
                <th class="p-3">당첨 갯수</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center">
                <td class="p-3">3개</td>
                <td class="p-3">5,000</td>
                <td class="p-3">${rankBoard[5]}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">4개</td>
                <td class="p-3">50,000</td>
                <td class="p-3">${rankBoard[4]}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개</td>
                <td class="p-3">1,500,000</td>
                <td class="p-3">${rankBoard[3]}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개 + 보너스볼</td>
                <td class="p-3">30,000,000</td>
                <td class="p-3">${rankBoard[2]}개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">6개</td>
                <td class="p-3">2,000,000,000</td>
                <td class="p-3">${rankBoard[1]}개</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-center font-bold">당신의 총 수익률은 ${rateToReturn}%입니다.</p>
        <div class="d-flex justify-center mt-5">
          <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    `;
};

export const getLottoPriceTemplate = ({ lottoList }) => {
  return `
      <section class="mt-9 ${lottoList.length ? 'visible' : 'hidden'}" id="lotto-list">
        <div class="d-flex">
          <label class="flex-auto my-0" data-lotto="count-label">총 ${lottoList.length}개를 구매하였습니다.</label>
          <div class="flex-auto d-flex justify-end pr-1">
            <label class="switch">
              <input type="checkbox" class="lotto-numbers-toggle-button" />
              <span class="text-base font-normal">번호보기</span>
            </label>
          </div>
        </div>
        <ul class="d-flex flex-wrap p-0">
          ${lottoList
            .map(
              (lotto) => `
              <li class="lotto-list-item d-flex items-center">
                  <span class="mx-1 text-4xl">🎟️ </span>
                  <span class="lotto-detail text-xl mx-3">${lotto.join(', ')}</span>
              </li>
          `
            )
            .join('')}
        </ul>
      </section>
    `;
};

export const getWinningFormTemplate = ({ winningNumber }) => {
  return `
      <label class="flex-auto d-inline-block mb-3">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label>
      <div class="d-flex">
        <div>
          <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
          <div id="winning-input">
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" max="45" min="1" value="${
              winningNumber.number[0] ?? ''
            }" required />
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" max="45" min="1" value="${
              winningNumber.number[1] ?? ''
            }" required />
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" max="45" min="1" value="${
              winningNumber.number[2] ?? ''
            }" required />
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" max="45" min="1" value="${
              winningNumber.number[3] ?? ''
            }" required />
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" max="45" min="1" value="${
              winningNumber.number[4] ?? ''
            }" required />
            <input type="number" class="winning-number mx-1 text-center" name="winning-number" max="45" min="1" value="${
              winningNumber.number[5] ?? ''
            }" required />
          </div>
        </div>
        <div class="bonus-number-container flex-grow">
          <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
          <div class="d-flex justify-center">
            <input type="number" class="bonus-number text-center" name="winning-number" max="45" min="1" value="${
              winningNumber.bonusNumber ?? ''
            }" required />
          </div>
        </div>
      </div>
      <button type="submit" class="open-result-modal-button mt-5 btn btn-cyan w-100">결과 확인하기</button>
    `;
};

export const getLottoManualPurchaseItemTemplate = () => {
  return `
    <li class="mb-2">
      <div class="d-flex items-center">
        <input type="number" class="winning-number mx-1 text-center" name="manual-number" max="45" min="1" required />
        <input type="number" class="winning-number mx-1 text-center" name="manual-number" max="45" min="1" required />
        <input type="number" class="winning-number mx-1 text-center" name="manual-number" max="45" min="1" required />
        <input type="number" class="winning-number mx-1 text-center" name="manual-number" max="45" min="1" required />
        <input type="number" class="winning-number mx-1 text-center" name="manual-number" max="45" min="1" required />
        <input type="number" class="winning-number mx-1 text-center" name="manual-number" max="45" min="1" required />
        <div class="flex-grow text-center">
          <button type="button" class="btn btn-cyan delete-btn">삭제</button>
        </div>
      </div>
    </li>
  `;
};
