import {LOTTO_MAX_VALUE, LOTTO_MIN_VALUE} from "../const/const.js"

export const generateRandom = (lottoCnt) => {
	const lottoNumList = []
	for (let i = 0; i < lottoCnt; i++) {
		lottoNumList[i] = Math.floor(Math.random() * (LOTTO_MAX_VALUE - LOTTO_MIN_VALUE + 1)) + LOTTO_MIN_VALUE
	}
	console.log('lottoNumList is ' + lottoNumList)
}