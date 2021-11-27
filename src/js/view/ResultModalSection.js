import View from './View.js';
import { LOTTO_PRIZE_INFO } from '../constants/constants.js';
import { setCommaThusandUnit } from '../utils/utils.js';

const ranks = [5, 4, 3, 2, 1];

export default class ResultModalSection extends View {
  constructor(el) {
    super(el);
  }

  render({ winningPrizeInfo, totalPrizeMoney, price }) {
    this.renderModal({ winningPrizeInfo, totalPrizeMoney, price });
    this.showModal();
    this.bindEvents();
  }

  renderModal({ winningPrizeInfo, totalPrizeMoney, price }) {
    this.$target.innerHTML = `
      <div class="modal-inner p-10">
        <div class="modal-close">
          <svg id="modalClose" viewbox="0 0 40 40">
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
              ${ranks
                .map((rank) => {
                  return `
                    <tr class="text-center">
                      <td class="p-3">${LOTTO_PRIZE_INFO[rank].title}</td>
                      <td class="p-3">${setCommaThusandUnit(
                        LOTTO_PRIZE_INFO[rank].prize
                      )}</td>
                      <td class="p-3">${winningPrizeInfo[rank]}개</td>
                    </tr>
                  `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
        <p class="text-center font-bold">당신의 총 수익률은 ${this.setPrizeYield(
          totalPrizeMoney,
          price
        )}%입니다.</p>
        <div class="d-flex justify-center mt-5">
          <button id="resetBtn" type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    `;
  }

  setPrizeYield(totalPrizeMoney, price) {
    return ((totalPrizeMoney - price) / price) * 100;
  }

  showModal() {
    this.$target.classList.add('open');
  }

  hideModal() {
    this.$target.classList.remove('open');
  }

  bindEvents() {
    this.$target.addEventListener('click', this.onClickResultModal.bind(this));
  }

  onClickResultModal({ target, currentTarget }) {
    if (target === currentTarget || target.closest('#modalClose')) {
      this.hideModal();
      return;
    }

    if (target.id === 'resetBtn') {
      this.emit('@clickResetBtn');
    }
  }
}
