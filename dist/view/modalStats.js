import { GRADES } from '../constants.js';
import el from '../dom.js';
import View from './index.js';
export default class ModalStats extends View {
    $modal;
    $close;
    $tbody;
    $earning;
    $reset;
    constructor() {
        super();
        this.$modal = el('<div class="modal">');
        this.$close = el(`
      <div class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </div>
    `);
        this.$tbody = el('<tbody>');
        this.$earning = el('<p>');
        this.$close.addEventListener('click', this.hide);
        this.$reset = el('<button type="button" class="btn btn-cyan">다시 시작하기</button>');
        this.$reset.addEventListener('click', this.reset);
        el(this, [
            el(this.$modal, [
                el('<div class="modal-inner p-10">', [
                    this.$close,
                    '<h2 class="text-center">🏆 당첨 통계 🏆</h2>',
                    el('<table class="result-table border-collapse border border-black">', [
                        `<thead>
              <tr class="text-center">
                <th class="p-3">일치 갯수</th>
                <th class="p-3">당첨금</th>
                <th class="p-3">당첨 갯수</th>
              </tr>
            </thead>`,
                        this.$tbody,
                    ]),
                    this.$earning,
                    el('<div class="d-flex justify-center mt-5">', [this.$reset]),
                ]),
            ]),
        ]);
    }
    buildResult({ winningList, earningRate }) {
        el(this.$tbody, Object.entries(GRADES).map(([grade, { matchCount, bonusMatched, winPrice }]) => {
            const winningCount = winningList[grade];
            return `
        <tr class="text-center">
          <td class="p-3">${matchCount}개${bonusMatched ? ' + 보너스볼' : ''}</td>
          <td class="p-3">${winPrice.toLocaleString('ko-KR')}</td>
          <td class="p-3">
            <span class="match-count">${winningCount}</span>개
          </td>
        </tr>
      `;
        }));
        this.$earning.textContent = `당신의 총 수익률은 ${earningRate.toLocaleString('ko-KR')}% 입니다.`;
    }
    show = () => {
        this.$modal.classList.add('open');
        return this;
    };
    hide = () => {
        this.$modal.classList.remove('open');
        return this;
    };
    reset = () => {
        this.emit('reset@modalStats');
    };
}
//# sourceMappingURL=modalStats.js.map