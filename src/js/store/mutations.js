import { PRIZES } from '../utils/constants.js'

export default {
	SET_PRICE(state, newPrice) {
		state.price = newPrice
	},
	SET_LOTTOS(state, newLottos) {
		state.lottos = newLottos
	},
	TOGGLE_IS_SHOW_NUMBER(state) {
		state.isShowNumber = !state.isShowNumber
	},
	SET_WINNING_NUMBERS(state, newWinningNumbers) {
		state.winningNumbers = newWinningNumbers
	},
	SET_BONUS_NUMBERS(state, newBonusNumbers) {
		state.bonusNumbers = newBonusNumbers
	},
	SET_PRIZE(state) {
		state.prizes = PRIZES.map((PRIZE) => {
			const matchedLotto = state.lottos.filter((lotto) => {
				const winningMathed = lotto.filter((num) =>
					state.winningNumbers.includes(num)
				)
				const bonusMathed = lotto.filter((num) =>
					state.winningNumbers.includes(num)
				)

				return (
					winningMathed === PRIZE.condition.winning &&
					bonusMathed === PRIZE.condition.bonus
				)
			})

			return matchedLotto.length
		})
	},
	SET_IS_SHOW_MODAL(state, newIsShowModal) {
		state.isShowModal = newIsShowModal
	},
}
