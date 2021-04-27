import  {$,$All,app,lotteImage,appBuySection,inputLastWeekNumber,alertMessage,winStatics} from './utils/constant.js'
import {calculateEarning} from "./utils/function.js";

let winNumber = {
  threeSameNum : 0,
  fourSameNum : 0,
  fiveSameNum : 0,
  fiveBonusSameNum : 0,
  sixSameNum : 0
}

let threeSameNum=0,fourSameNum=0,fiveSameNum=0,fiveBonusSameNum=0,sixSameNum=0;

class Lotte{
  constructor(){
    this.start();
    this.isNumberOpen = true;
    this.winningNumberArr = [];

    this.myLotteNumberArr = [];
    this.bonusNumber = -Infinity;
    this.beforeNumberArr = [];
    this.beforeBonusNum = -Infinity;

    this.myLotteNumsFromDom  = [];
    this.correctNum = 0;
    this.compareBonus= false;
    this.randomValue = 0;
    this.earning = 0;
  }
  start(){
    document.body.innerHTML = app;
    $('#payBtn').addEventListener('click',()=>{
      const payment =  Number($('.pl-2').value);
      if(payment % 1000 !== 0){
        alert(alertMessage.numInTheThousands);
      }
      else{
        this.clickBuyBtn(payment);
      }
    })
  }

  clickBuyBtn(payment){
    $('.mt-5').insertAdjacentHTML('afterend',appBuySection(payment/1000));
    for(let i=0;i<payment/1000;i++) {
      for(let j=0;j<6;j++){
        this.randomValue = Math.floor(Math.random()*45);
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

new Lotte();


/*
const $showResultButton = document.querySelector('.open-result-modal-button')
const $modalClose = document.querySelector('.modal-close')
const $modal = document.querySelector('.modal')
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
)

const onModalShow = () => {
  $modal.classList.add('open')
}

const onModalClose = () => {
  $modal.classList.remove('open')
}

$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)
*/
