import { $, $All, winStatics } from "../utils/constant.js";
import { calculateEarning } from "../utils/function.js";
import { Render } from "./render.js";

class ResultLotte extends Render {
  constructor() {
    super();
  }

  displayResult() {
    if (this.winningNumberArr.length === 6 && this.bonusNumber !== -Infinity) {
      this.fillResultLotte();
      $(".modal").classList.add("open");
      $("#modal-restart").addEventListener("click", () => {
        this.render();
      });
      $(".modal-close").addEventListener("click", () => {
        this.clearDom();
        this.clearValue();
      });
    }
  }

  fillResultLotte() {
    $All(".winning-number").forEach((dom) =>
      this.beforeNumberArr.push(dom.value)
    );

    this.beforeBonusNum = $(".bonus-number").value;

    $All("#lotteNumber").forEach((Dom) => {
      this.myLotteNumsFromDom = Dom.innerHTML.split(",");
      this.myLotteNumsFromDom.forEach((val) => {
        if (this.beforeNumberArr.indexOf(val) > -1) {
          this.correctNum++;
        }
      });
      if (this.myLotteNumsFromDom.indexOf(this.beforeBonusNum) > -1) {
        this.compareBonus = true;
      }
      switch (this.correctNum) {
        case 3:
          this.winNumber.threeSameNum++;
          break;
        case 4:
          this.winNumber.fourSameNum++;
          break;
        case 5:
          this.winNumber.fiveSameNum++;
          break;
        case 6:
          this.winNumber.sixSameNum++;
          break;
      }
      if (this.correctNum === 5 && this.compareBonus === true) {
        this.winNumber.fiveSameNum--;
        this.winNumber.fiveBonusSameNum++;
      }
      this.compareBonus = false;
      this.correctNum = 0;
    });

    this.earning = calculateEarning(this.winNumber);
    $("#app").insertAdjacentHTML(
      "beforeend",
      winStatics(this.winNumber, this.earning)
    );
  }

  clearDom() {
    this.winningNumberArr = [];
    this.beforeNumberArr = [];
    for (let val in this.winNumber) {
      this.winNumber[val] = 0;
    }
  }
  clearValue() {
    $(".modal").classList.remove("open");
    $(".modal").remove();
  }
}

export { ResultLotte };
