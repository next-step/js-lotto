import  {$,$All,app,lotteImage,appBuySection,inputLastWeekNumber,alertMessage,winStatics} from './utils/constant.js'

let value = [];
let winningNumber = [];
let bonusNumber;

let threeSameNum=0,fourSameNum=0,fiveSameNum=0,fiveBonusSameNum=0,sixSameNum=0;

class Lotte{
  constructor(){
    this.start();
    this.isOpen = true;
    this.winningNumber = [];
    this.bonusNumber = -Infinity;
    this.value = value;
    this.beforeNums = [];
    this.beforeBonusNum = -Infinity;
    this.myLotteNums  = [];
    this.myLotteBonusNum = -Infinity;
    this.num = 0;
    this.compareBonus= false;
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
        this.value.push(Math.round(Math.random()*45+1));
      }
      $('#lotteImageTitle').insertAdjacentHTML('afterend', lotteImage(...this.value));
      this.value = [];
    }
    $('#app').insertAdjacentHTML('beforeend',inputLastWeekNumber)
    $('#seeNum').addEventListener('click',()=>{this.displayNum(this.isOpen)});
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
      this.isOpen=false;
    }
    else{
      $All('#lotteImage').forEach((dom) => {
        dom.style.display = 'inline';
      })
      $All('#lotteNumber').forEach((dom) => {
        dom.style.display = 'none'
      })
      this.isOpen=true;
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
        this.winningNumber = [];
        break;
      }
      else if(this.winningNumber.indexOf($All('.winning-number')[i].value) > -1){
        alert(alertMessage.duplicationNum);
        this.winningNumber = [];
        break;
      }
      else{
        this.winningNumber.push($All('.winning-number')[i].value)
      }
    }
  }

  checkBonusNum(){
    if($('.bonus-number').value < 1 || $('.bonus-number').value>45) {
      alert(alertMessage.bonusOverNum);
      this.winningNumber = [];
    }
    else if(this.winningNumber.indexOf($('.bonus-number').value) > -1){
      alert(alertMessage.duplicationNum);
      this.winningNumber = [];
    }
    else {
      this.bonusNumber = ($('.bonus-number').value);
    }
  }

  displayResult(){
    if(this.winningNumber.length === 6 && this.bonusNumber !== -Infinity) {
      this.fillResultLotte();
      $('.modal').classList.add('open');
      $('.modal-close').addEventListener('click', () => {
        $('.modal').classList.remove('open');
        this.winningNumber = [];
      })
    }
  }

  fillResultLotte(){
    $All('.winning-number').forEach(dom=>this.beforeNums.push(dom.value));

    this.beforeBonusNum = $('.bonus-number').value;

    $All('#lotteNumber').forEach((Dom)=>{
      this.myLotteNums = Dom.innerHTML.split(',');
      this.myLotteNums.forEach((val)=>{
        if(this.beforeNums.indexOf(val) > -1){
          this.num++;
        }
      })
      if(this.myLotteNums.indexOf(this.beforeBonusNum) > -1){
        this.compareBonus = true;
      }
      console.log(this.num);
      switch(this.num){
        case 3 : threeSameNum++;
                break;
        case 4 : fourSameNum++;
          break;
        case 5 : fiveSameNum++;
          break;
        case 6 : sixSameNum++;
          break;
      }
      if(this.num ===5 && this.compareBonus === true){
        fiveSameNum--;
        fiveBonusSameNum++;
      }
      this.compareBonus = false;
      this.num = 0;
    });
    $('#app').insertAdjacentHTML('beforeend',winStatics(threeSameNum,fourSameNum,fiveSameNum,fiveBonusSameNum,sixSameNum))

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
