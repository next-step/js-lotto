import Component from '../core/Component.js'
import { CLASS, SELECTOR } from '../utils/constants.js'
import { $get } from '../utils/dom.js'
import { ResultRow } from './ResultRow.js'

export class ResultModal extends Component {
	constructor() {
		super()
	}

	mapState() {
		this.stateList = ['isShowModal', 'prizes']
	}

	mapActions() {
		this.actionList = ['setIsShowModal']
	}

	setElements() {
		this.$resultRowContainer = $get(SELECTOR.RESULT_ROW_CONTAINER, this.$target)
	}

	setEvents() {
		this.$target.addEventListener('click', (e) => {
			if (e.target.closest(SELECTOR.MODAL_CLOSE_BTN)) {
				this.setIsShowModal(false)
				return
			}

			if (e.target.closest(SELECTOR.RELOAD_BTN)) {
				location.reload()
				return
			}
		})
	}

	render() {
		this.toggleTarget(this.isShowModal)
		this.setPrizeRows()
	}

	toggleTarget(isShow) {
		if (isShow) {
			this.$target.classList.add(CLASS.MODAL_OPEN)
		} else {
			this.$target.classList.remove(CLASS.MODAL_OPEN)
		}
	}

	setPrizeRows() {
		// this.prizes.forEach((prize, index) => {
		// 	const resultRow = new ResultRow({ prize, index })
		// 	this.$resultRowContainer.appendChild(resultRow.$target)
		// })
	}

	template() {
		return /*html*/ `
			<div class="modal">
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
							<tbody class="result-row-container"></tbody>
						</table>
					</div>
					<p class="text-center font-bold">당신의 총 수익률은 <span class="earnings-rate">${123}</span>%입니다.</p>
					<div class="d-flex justify-center mt-5">
						<button type="button" class="${
							CLASS.RELOAD_BTN
						} btn btn-cyan">다시 시작하기</button>
					</div>
				</div>
			</div>
		`
	}
}
