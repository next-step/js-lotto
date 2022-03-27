import {
  LOTTO_MODAL,
  LOTTO_MODAL__CLOSE,
  LOTTO_MODAL_BENEFIT_RATE,
  LOTTO_MODAL_WINNING_RESULT,
  LOTTO_MODAL__RESTART,
} from '../constants/selectTarget.js';
import { $ } from '../util/dom.js';
import { PRIZE_TYPES } from '../constants/prize.js';

const ResultModal = ($parent, { closeModal, reStart }) => {
  const trTemplate = (prize) => `<tr class="text-center ${LOTTO_MODAL_WINNING_RESULT}">
                  <td class="p-3">${prize.text}</td>
                  <td class="p-3">${prize.cost.toLocaleString()}</td>
                  <td class="p-3">0개</td>
                </tr>`;

  const template = `<div class="modal ${LOTTO_MODAL}">
        <div class="modal-inner p-10">
          <div class="modal-close ${LOTTO_MODAL__CLOSE}">
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
                ${Object.values(PRIZE_TYPES).map(trTemplate).join('')}
              </tbody>
            </table>
          </div>
          <p class="text-center font-bold ${LOTTO_MODAL_BENEFIT_RATE}">당신의 총 수익률은 %입니다.</p>
          <div class="d-flex justify-center mt-5">
            <button type="button" class="btn btn-cyan ${LOTTO_MODAL__RESTART}">다시 시작하기</button>
          </div>
        </div>
      </div>`;

  const $el = document.createElement('div');
  $el.innerHTML = template;
  $(LOTTO_MODAL__CLOSE, $el).addEventListener('click', closeModal);
  $(LOTTO_MODAL__RESTART, $el).addEventListener('click', reStart);
  $parent.replaceWith($el);
};

export default ResultModal;
