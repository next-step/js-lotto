import {$, $All, appBuySection, inputLastWeekNumber, lotteImage} from "../utils/constant.js";
import {alertMessage} from "../utils/errorMessage.js";
import {ResultLotte} from "./ResultLotte.js";

class ProcessingLotte extends ResultLotte{
  constructor(){
    super();
  }

  clickBuyBtn(payment){
    $('.mt-5').insertAdjacentHTML('afterend',appBuySection(payment/1000));
    for(let i=0;i<payment/1000;i++) {
      for(let j=0;j<6;j++){
        this.randomValue = Math.floor(Math.random()*45)+1;
        if(this.myLotteNumberArr.indexOf(this.randomValue) > -1)
          j--;
        else
          this.myLotteNumberArr.push(this.randomValue);
      }
      $('#lotteImageTitle').insertAdjacentHTML('afterend', lotteImage(...this.myLotteNumberArr));
      this.myLotteNumberArr = [];

    }
    $('#app').insertAdjacentHTML('beforeend',inputLastWeekNumber)
    $('#seeNum').addEventListener('click',()=>{this.displayNum(this.isNumberOpen)});
    $('.open-result-modal-button').addEventListener('click',()=>{this.clickResult()});
  }

  displayNum(isOpen){
    if(isOpen) {
      $All('#lotteImage').forEach((dom) => {
        dom.style.display = 'block';
      })
      $All('#lotteNumber').forEach((dom) => {
        dom.style.display = 'inline'
      })
      this.isNumberOpen=false;
    }
    else{
      $All('#lotteImage').forEach((dom) => {
        dom.style.display = 'inline';
      })
      $All('#lotteNumber').forEach((dom) => {
        dom.style.display = 'none'
      })
      this.isNumberOpen=true;
    }
  }

  clickResult(){
    this.checkBeforeNum();
    this.displayResult();
  }

  checkBeforeNum(){
    this.checkWinningNum();
    this.checkBonusNum();
  }

  checkWinningNum(){
    for(let i=0;i<$All('.winning-number').length;i++){
      if($All('.winning-number')[i].value < 1 || $All('.winning-number')[i].value > 45) {
        alert(alertMessage.winningOverNum);
        this.winningNumberArr = [];
        break;
      }
      else if(this.winningNumberArr.indexOf($All('.winning-number')[i].value) > -1){
        alert(alertMessage.duplicationNum);
        this.winningNumberArr = [];
        break;
      }
      else{
        this.winningNumberArr.push($All('.winning-number')[i].value)
      }
    }
  }

  checkBonusNum(){
    if($('.bonus-number').value < 1 || $('.bonus-number').value>45) {
      alert(alertMessage.bonusOverNum);
      this.winningNumberArr = [];
    }
    else if(this.winningNumberArr.indexOf($('.bonus-number').value) > -1){
      alert(alertMessage.duplicationNum);
      this.winningNumberArr = [];
    }
    else {
      this.bonusNumber = ($('.bonus-number').value);
    }
  }

}

export {ProcessingLotte}
