import { NumberInput } from './NumberInput.js'
import { CLASS } from '../utils/constants.js'

export class NumberWinningInput extends NumberInput {
	constructor() {
		super()
	}

	template() {
		return /*html*/ `
      <input type="number" class="${CLASS.NUMBER_WINNING} mx-1 text-center" />
		`
	}
}
