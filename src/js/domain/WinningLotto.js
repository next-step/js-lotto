const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;
const LOTTO_LENGTH = 6;
const MESSAGE = {
    ERROR: {
        EXIST_WINNING_NUMBER: `중복된 당첨 번호가 있습니다.`,
        OUT_OF_RANGE: `당첨 번호는 ${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER} 사이로 입력해야합니다.`,
    },
};

export class WinningLotto {
    lottos;
    bonus;
    winningNumbers;

    constructor(lottos, bonus) {
        this.lottos = lottos;
        this.bonus = bonus;
    }

    checkWinningNumber() {
        let winningNumber = {};
        let resultValue = { isComplete: true, message: "" };

        if (this.winningNumbers.length < LOTTO_LENGTH) {
            resultValue = {
                isComplete: false,
                message: "입력하지 않은 당첨 번호가 있습니다.",
            };
            return resultValue;
        }

        for (let i = 0; i < this.winningNumbers.length; i++) {
            if (
                this.winningNumbers[i] < LOTTO_MIN_NUMBER ||
                this.winningNumbers[i] > LOTTO_MAX_NUMBER
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

        if (this.bonus < LOTTO_MIN_NUMBER || this.bonus > LOTTO_MAX_NUMBER) {
            resultValue = {
                isComplete: false,
                message: MESSAGE.ERROR.OUT_OF_RANGE,
            };

            return resultValue;
        }

        return resultValue;
    }
}
