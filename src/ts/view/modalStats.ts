import { GRADES, WinningList } from '../constants.js'
import el from '../dom.js'
import View from './index.js'

export default class ModalStats extends View {
  $modal
  $close
  $tbody
  $earning
  $reset

  static template = `
  <div class="modal">
    <div class="modal-inner p-10">
      <div class="modal-close">
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </div>
      <h2 class="text-center">🏆 당첨 통계 🏆</h2>
      <table class="result-table border-collapse border border-black">
        <thead>
          <tr class="text-center">
            <th class="p-3">일치 갯수</th>
            <th class="p-3">당첨금</th>
            <th class="p-3">당첨 갯수</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <p class="text-center font-bold earning">당신의 총 수익률은 0% 입니다.</p>
      <div class="d-flex justify-center mt-5">
        <button type="button" class="btn btn-cyan btn-reset">다시 시작하기</button>
      </div>
    </div>
  </div>
  `

  constructor() {
    super()
    this.$modal = el(ModalStats.template)
    this.$close = this.$modal.querySelector('.modal-close') as HTMLDivElement
    this.$tbody = this.$modal.querySelector('tbody') as HTMLTableSectionElement
    this.$earning = this.$modal.querySelector('.earning') as HTMLParagraphElement
    this.$reset = this.$modal.querySelector('.btn-reset') as HTMLButtonElement

    this.$close.addEventListener('click', this.hide)
    this.$reset.addEventListener('click', this.reset)

    el(this, [this.$modal])
  }

  buildResult({ winningList, earningRate }: { winningList: WinningList; earningRate: number }) {
    el(
      this.$tbody,
      Object.entries(GRADES).map(
        ([grade, { matchCount, bonusMatched, winPrice }]) => `
        <tr class="text-center">
          <td class="p-3">${matchCount}개${bonusMatched ? ' + 보너스볼' : ''}</td>
          <td class="p-3">${winPrice.toLocaleString('ko-KR')}</td>
          <td class="p-3">
            <span class="match-count">${winningList[grade]}</span>개
          </td>
        </tr>
      `,
      ),
    )
    this.$earning.textContent = `당신의 총 수익률은 ${earningRate.toLocaleString('ko-KR')}% 입니다.`
  }
  show = () => {
    this.$modal.classList.add('open')
    return this
  }
  hide = () => {
    this.$modal.classList.remove('open')
    return this
  }
  reset = () => {
    this.emit('reset@modalStats')
  }
}
