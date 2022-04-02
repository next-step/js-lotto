import { LottoNumber } from "./LottoNumber.js";

const MESSAGE = {
    ERROR: {
        EXIST_WINNING_NUMBER: `중복된 당첨 번호가 있습니다.`,
       // OUT_OF_RANGE: `당첨 번호는 ${LottoNumber.MIN} ~ ${LottoNumber.MAX} 사이로 입력해야합니다.`,
    },
};

export class WinningNumbers {
    static bonus;
    static winningNumbers;

    constructor(lottos, bonus) {
        this.lottos = lottos;
        this.bonus = bonus;
    }

    checkWinningNumber() {
        let winningNumber = {};
        let resultValue = { isComplete: true, message: "" };

        if (this.winningNumbers.length < WinningNumbers.LOTTO_LENGTH) {
            resultValue = {
                isComplete: false,
                message: "입력하지 않은 당첨 번호가 있습니다.",
            };
            return resultValue;
        }

        for (let i = 0; i < this.winningNumbers.length; i++) {
            if (
                this.winningNumbers[i] < LottoNumber.MIN ||
                this.winningNumbers[i] > LottoNumber.MAX
            ) {
                resultValue = {
                    isComplete: false,
                    message: MESSAGE.ERROR.OUT_OF_RANGE,
                };

                return resultValue;
            }

            if (winningNumber[this.winningNumbers[i]]) {
                resultValue = {
                    isComplete: false,
                    message: MESSAGE.ERROR.EXIST_WINNING_NUMBER,
                };

                return resultValue;
            } else {
                winningNumber[this.winningNumbers[i]] = this.winningNumbers[i];
            }
        }

        if (!this.bonus) {
            resultValue = {
                isComplete: false,
                message: "보너스 번호를 입력하지 않았습니다.",
            };

            return resultValue;
        }

        if (winningNumber[this.bonus]) {
            resultValue = {
                isComplete: false,
                message: "보너스 번호가 당첨 번호와 중복되는 번호입니다.",
            };

            return resultValue;
        }

        if (this.bonus < LottoNumber.MIN || this.bonus > LottoNumber.MAX) {
            resultValue = {
                isComplete: false,
                message: MESSAGE.ERROR.OUT_OF_RANGE,
            };

            return resultValue;
        }

        return resultValue;
    }
}
