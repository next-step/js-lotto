import DuplicateBonusNumberException from "../exceptions/DuplicateBonusNumberException.js";
import DuplicationWinningNumberException from "../exceptions/DuplicateWinningNumberException.js";
import NotExistBonusNumberException from "../exceptions/NotExitstBonusNumberException.js";
import OutofRangeBonusNumberException from "../exceptions/OutOfRangeBonusNumberException.js";
import OutOfRangeWinningNumberException from "../exceptions/OutOfRangeWinningNumberException.js";
import WinnerNumberLengthException from "../exceptions/WinnerNumberLengthException.js";
import LottoNumber from "./LottoNumber.js";

export default class WinningNumbers {
    constructor(winningNumbers, bonusNumber) { 
        this.validate(winningNumbers, bonusNumber);

    }

    static validate(winningNumbers, bonusNumber) {
        if (winningNumbers.length < LottoNumber.LOTTO_LENGTH) throw new WinnerNumberLengthException();
        
        if (!bonusNumber) throw new NotExistBonusNumberException();

        for(let i=0;i<winningNumbers.length; i++) {
            if(winningNumbers[i] < LottoNumber.MIN || winningNumbers[i] > LottoNumber.MAX) throw new OutOfRangeWinningNumberException();
        }

        if (winningNumbers.length !== new Set(winningNumbers).size) throw new DuplicationWinningNumberException(); 

        if(winningNumbers.includes(bonusNumber)) throw new DuplicateBonusNumberException();

        if (bonusNumber < LottoNumber.MIN || bonusNumber > LottoNumber.MAX) throw new OutofRangeBonusNumberException();
    }
}
