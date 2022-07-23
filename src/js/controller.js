import model from "./model.js";
import observable from "../js/util/observable.js";

import { notifyTypes, winningTypes, NUM_OF_LOTTO_NUMBERS } from "./util/constants.js";

class Controller {
  constructor() {
    this.lottoModel = model;
  }

  handleBuyLottiesBtnClick(paidMoney) {
    this.lottoModel.buyLotties(paidMoney);
    observable.notify(notifyTypes.BUY_LOTTIES, this.lottoModel.curLotties);
  }

  handleShowLottieNumBtnToggle() {
    const lottieNumbers = this.lottoModel.curLotties.map((numbers) => numbers.join(", "));
    observable.notify(notifyTypes.TOGGLE_SHOW_LOTTIES_NUMBERS, lottieNumbers);
  }

  handleInputWinningLottoDigits(index, digit) {
    this.lottoModel.setWinningLottoDigits(index, digit);
  }

  canShowModal() {
    return !this.lottoModel.winningLottoDigits.some((number) => number <= 0 || number > 45);
  }

  handleModalOpen() {
    this.lottoModel.curLotties.forEach((curLottoNumber) => this.checkWinningType(curLottoNumber));
    const profitRatio = Math.round((this.lottoModel.earnedMoney / this.lottoModel.paidMoney) * 100);
    observable.notify(notifyTypes.SHOW_LOTTIE_WINNING_INFO, profitRatio, this.lottoModel.winningInfo);
  }

  handleModalClose() {
    this.lottoModel.resetWinningInfo();
  }

  handleLottoReset() {
    this.lottoModel.initLottiesModel();
    observable.notify(notifyTypes.RESET_LOTTIE_GAME);
  }

  checkWinningType(curLottoNumber) {
    const mybasicNumbers = curLottoNumber.slice(0, -1);
    const mybonusNumber = curLottoNumber.at(-1);
    const winningBasicNumbers = this.lottoModel.winningLottoDigits.slice(0, -1);
    const winningBonusNumber = this.lottoModel.winningLottoDigits.at(-1);

    const flag = Array.from({ length: NUM_OF_LOTTO_NUMBERS }, () => 0);

    const correctNumbers = mybasicNumbers.filter((number, idx) => {
      if (winningBasicNumbers.includes(number) && flag[idx] === 0) {
        flag[idx] = 1;
        return true;
      }
    });

    switch (correctNumbers.length) {
      case 3: {
        this.lottoModel.addEarnedMoney(winningTypes.THREE);
        break;
      }
      case 4: {
        this.lottoModel.addEarnedMoney(winningTypes.FOUR);
        break;
      }
      case 5: {
        if (mybonusNumber === winningBonusNumber) {
          this.lottoModel.addEarnedMoney(winningTypes.FIVE_WITH_BONUS);
        } else {
          this.lottoModel.addEarnedMoney(winningTypes.FIVE);
        }
        break;
      }
      case 6: {
        this.lottoModel.addEarnedMoney(winningTypes.ALL);
        break;
      }
      default:
        break;
    }
  }
}

export default new Controller();
