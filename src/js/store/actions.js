import { NUMBERS } from '../utils/constants.js'

export default {
	setPrice({ commit }, newPrice) {
		const newLottos = createLottos(newPrice)

		commit('SET_PRICE', +newPrice)
		commit('SET_LOTTOS', newLottos)
	},
	toggleIsShowNumber({ commit }) {
		commit('TOGGLE_IS_SHOW_NUMBER')
	},
	setWinningNumbers({ commit }, newWinningNumbers) {
		commit('SET_WINNING_NUMBERS', newWinningNumbers)
	},
	setBonusNumbers({ commit }, newBonusNumbers) {
		commit('SET_BONUS_NUMBERS', newBonusNumbers)
	},
	setIsShowModal({ commit }, newIsShowModal) {
		if (newIsShowModal) {
			commit('SET_PRIZE')
		}
		commit('SET_IS_SHOW_MODAL', newIsShowModal)
	},
}

function createLottos(price) {
	const lottos = []
	const count = price / NUMBERS.LOTTO_PRICE_UNIT

	for (let i = 0; i < count; i++) {
		const lotto = createOneLotto()
		lottos.push(lotto)
	}

	return lottos
}

function createOneLotto() {
	const lotto = []

	while (lotto.length !== 6) {
		const randomNumber = getLottoNumber()
		if (lotto.includes(randomNumber)) {
			continue
		}

		lotto.push(randomNumber)
	}

	return lotto
}

function getLottoNumber() {
	return parseInt(
		Math.random() * (NUMBERS.LOTTO_MAX - NUMBERS.LOTTO_MIN) + NUMBERS.LOTTO_MIN
	)
}
