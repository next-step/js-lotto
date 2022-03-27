const LOTTO_MAX_NUMBER = 45;
const LOTTO_LENGTH = 6;

export class WinningLotto {
    lottos = null;
    bonus = null;
    winningNumbers = null;
    constructor(lottos, bonus) {
        this.lottos = lottos;
        this.bonus = bonus;
    }    

    setLottos(lottos) {
        this.lottos = lottos;
    }

    setBonus(bonus) {
        this.bonus = bonus;
    }

    setWinningNumbers(numbers) {
        this.winningNumbers = numbers;
    }

    checkWinningNumber() {
        console.log(1);
        let winningNumber = {};
        let resultValue = {isComplete: true, message: ""};

        for(let i=0; i<this.winningNumbers.length; i++) {
            if(this.winningNumbers.length < LOTTO_LENGTH) {
                resultValue = {
                    isComplete: false,
                    message: "입력하지 않은 당첨 번호가 있습니다."
                }

                return resultValue; 
            }

            if(this.winningNumbers[i].value > LOTTO_MAX_NUMBER) {
                resultValue = {
                    isComplete: false,
                    message: MESSAGE.ERROR.MAX_PURCHASE
                }
                
                return resultValue;
            }

            if(winningNumber[this.winningNumbers[i].value]) {
                resultValue = {
                    isComplete: false,
                    message: MESSAGE.ERROR.EXIST_WINNING_NUMBER
                }
                
                return resultValue;
            } else {
                winningNumber[this.winningNumbers[i].value] = this.winningNumbers[i].value;
            }
        }

        if(!this.bonus) {
            resultValue = {
                isComplete: false,
                message: "보너스 번호를 입력하지 않았습니다."
            }
            
            return resultValue;
        }

        if(winningNumber[this.bonus]) {
            resultValue = {
                isComplete: false,
                message: "보너스 번호가 당첨 번호와 중복되는 번호입니다."
            }
            
            return resultValue;
        }

        return resultValue;
    }
}