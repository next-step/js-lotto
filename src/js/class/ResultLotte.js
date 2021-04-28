import {$, $All, winStatics} from "../utils/constant.js";
import {calculateEarning} from "../utils/function.js";

let winNumber = {
  threeSameNum : 0,
  fourSameNum : 0,
  fiveSameNum : 0,
  fiveBonusSameNum : 0,
  sixSameNum : 0
}

class ResultLotte{
  constructor(){}

  displayResult(){
    if(this.winningNumberArr.length === 6 && this.bonusNumber !== -Infinity) {
      this.fillResultLotte();
      $('.modal').classList.add('open');
      $('.modal-close').addEventListener('click', () => {
        $('.modal').classList.remove('open');
        this.winningNumberArr = [];
        this.beforeNumberArr = [];
        for(let val in winNumber) {
          winNumber[val] = 0;
        }
        $('.modal').remove();
      })
    }
  }

  fillResultLotte(){
    $All('.winning-number').forEach(dom=>this.beforeNumberArr.push(dom.value));

    this.beforeBonusNum = $('.bonus-number').value;

    $All('#lotteNumber').forEach((Dom)=>{
      this.myLotteNumsFromDom = Dom.innerHTML.split(',');
      this.myLotteNumsFromDom.forEach((val)=>{
        if(this.beforeNumberArr.indexOf(val) > -1){
          this.correctNum++;
        }
      })
      if(this.myLotteNumsFromDom.indexOf(this.beforeBonusNum) > -1){
        this.compareBonus = true;
      }
      switch(this.correctNum){
        case 3 : winNumber.threeSameNum++;
          break;
        case 4 : winNumber.fourSameNum++;
          break;
        case 5 : winNumber.fiveSameNum++;
          break;
        case 6 : winNumber.sixSameNum++;
          break;
      }
      if(this.correctNum ===5 && this.compareBonus === true){
        winNumber.fiveSameNum--;
        winNumber.fiveBonusSameNum++;
      }
      this.compareBonus = false;
      this.correctNum = 0;
    });

    this.earning = calculateEarning(winNumber);
    $('#app').insertAdjacentHTML('beforeend',winStatics(winNumber,this.earning))
  }
}

export {ResultLotte}
