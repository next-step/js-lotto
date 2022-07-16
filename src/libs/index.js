import { generateLotto, changeAmountToCount, getWinningNumberIndex } from '../js/lotto.js';
import {
	isPurchaseAmountValidator,
	generateResultValidator,
	winningNumberValidator,
} from './validator.js';

import { reduce, go, isNil, includes } from './fp.js';

export {
	isPurchaseAmountValidator,
	generateResultValidator,
	winningNumberValidator,
	generateLotto,
	changeAmountToCount,
	getWinningNumberIndex,
	reduce,
	go,
	isNil,
	includes,
};
