import { $, $$ } from "./dom.js"
import { MONEY, MESSAGE, BALL, WIN_NUMBER_SECTION, FUNC } from "./constant.js"

const $modalClose = $(".modal-close");
const $modal = $(".modal");
const $restartBtn = $(".btn-restart");

const $topDiv = $("div.w-100");
const $getMoneyForm = $("form.mt-5");

const lottoRewards = [5000, 50000, 1500000, 30000000, 2000000000];
let lottoTickets = [];



const onModalShow = () => {
  $modal.classList.add('open')
}

const onModalClose = () => {
  $modal.classList.remove('open')
}
const getMoneyAmount = ({target}) => {
  if (target.tagName == "BUTTON"){
    let input = $("input", target.parentNode);
    let amount = input.value;
    if (FUNC.checkRange(amount, MONEY.MIN, MONEY.MAX)){
     if (amount % 1000 !== 0){
       alert(MESSAGE.MONEY_UNIT);
       input.value = "";
       input.focus();
     } else if ($("section") == null){
      addTicketSection(amount);
      addWinNumberForm();
     }
    }
  }
}



const addTicketSection = (amount) => {
  console.log(amount);

  let ticketDOMs = "";
  
  // for(let i = 0; i < amount / 1000; i++){
  //   ticketDOMs += makeLOTTO();
  // }

  // ticketDOMs += makeLOTTO_fortest([1,41,42,43,44,45]);
  // ticketDOMs += makeLOTTO_fortest([1,2,41,42,43,44]);
  ticketDOMs += makeLOTTO_fortest([1,2,3,41,42,43]);
  // ticketDOMs += makeLOTTO_fortest([1,2,3,4,42,43]);
  // ticketDOMs += makeLOTTO_fortest([1,2,3,4,5,43]);
  // ticketDOMs += makeLOTTO_fortest([1,2,3,4,5,7]);
  // ticketDOMs += makeLOTTO_fortest([1,2,3,4,5,6]);

  const lotto_section = 
  `<section class="mt-9 lotto-section">
            <div class="d-flex">
              <label class="flex-auto my-0">총 ${amount / 1000}개를 구매하였습니다.</label>
              <div class="flex-auto d-flex justify-end pr-1">
                <label class="switch">
                  <input type="checkbox" class="lotto-numbers-toggle-button" />
                  <span class="text-base font-normal">번호보기</span>
                </label>
              </div>
            </div>
            <div id="ticket-display" class="d-flex flex-wrap">
            ${ticketDOMs}
            </div>
          </div>`
  $topDiv.insertAdjacentHTML("beforeend", lotto_section);
  addTicketDisplaySwitch();
}

const addTicketDisplaySwitch = () => {
  $("label.switch>input").addEventListener("click", attributeSwitching);
}

const attributeSwitching = () => {
  $("#ticket-display").classList.toggle("flex-col");
  const $tickets = $$(".lotto-detail");
  $tickets.forEach((x) => {
    if (x.style.display == "none"){
      x.style.display = "inline";
    } else{
      x.style.display = "none"
    }
  })
}

const makeLOTTO = () => {
  let numbers = ""; 
  let ary = [];
  for(let i = 0; i < 6; i++){
    let num = FUNC.getRandomVal(BALL.MIN, BALL.MAX);
    while (ary.includes(num)){
      num = FUNC.getRandomVal(BALL.MIN, BALL.MAX);
    }
    ary.push(num);
  }
  lottoTickets.push({numbers : ary, grade : "None"});
  numbers = ary.join(", ");

  const ticket = `<div class="mx-1 text-4xl lotto-wrapper">
  <span class="lotto-icon">🎟️ </span>
  <span class="lotto-detail" style="display: none; font-size:22px">${numbers}</span>
  </div>`

  return ticket;
}

const makeLOTTO_fortest = (ary) => {
  let numbers = ""; 
  
  lottoTickets.push({numbers : ary, grade : "None"});
  numbers = ary.join(", ");

  const ticket = `<div class="mx-1 text-4xl lotto-wrapper">
  <span class="lotto-icon">🎟️ </span>
  <span class="lotto-detail" style="display: none; font-size:22px">${numbers}</span>
  </div>`

  return ticket;
}

const addWinNumberForm = () => {
  $topDiv.insertAdjacentHTML("beforeend", WIN_NUMBER_SECTION);
  const $winning_inputs = $$(".winning-number");
  const $bonus_input = $(".bonus-number");
  const $showResultButton = $(".open-result-modal-button");
  

  for(let i = 0; i < 5; i++){
    $winning_inputs[i].addEventListener("input", (e) => {
      if (e.target.value.length == 2)
        $winning_inputs[i + 1].focus();
    })
  }
  $winning_inputs[5].addEventListener("input", (e) => {
    if (e.target.value.length == 2)
      $bonus_input.focus();
  })

  $showResultButton.addEventListener("click", 
      () => getWinningNumbers($winning_inputs, $bonus_input))
}

const getWinningNumbers = ($winningNode, $bonusNode) =>{
  let win_nums = [];
    let bonus = parseInt($bonusNode.value);
    for(let i = 0; i < 6; i++){
      let num = parseInt($winningNode[i].value);
      if (FUNC.checkRange(num, BALL.MIN, BALL.MAX))
        win_nums.push(num);
    }
    if (win_nums.length == 6 && 
      FUNC.checkRange(bonus, BALL.MIN, BALL.MAX)){
      if (FUNC.checkDupElement([...win_nums, bonus])){
        alert(MESSAGE.NUM_DUP);
        return ;
      }
      countWinningTicket(win_nums, bonus);
      onModalShow();
    }
}

const countWinningTicket = (win_nums, bonus_num) => {
  let matchRanks = [0, 0, 0, 0, 0];
  console.log(win_nums, bonus_num);
  console.log(lottoTickets);
  lottoTickets.forEach((x, i) => {
    let match = 0;
    let bonus = false;
    x.numbers.forEach((v, j) => {
      if (win_nums.includes(v))
        match++;
      if (v == bonus_num)
        bonus = true;
    })
    console.log(x.numbers, match, bonus);
    checkTicketRank(matchRanks, match, bonus);
  })
  console.log(matchRanks);
  changeModalNumber(matchRanks);
}

const checkTicketRank = (matchRanks, match, bonus) => {
  switch (match){
    case 3 : 
      matchRanks[0]++;
      break;
    case 4 : 
      matchRanks[1]++;
      break;
    case 5 :
      if (!bonus)
        matchRanks[2]++;
      else
        matchRanks[3]++;
      break;
    case 6 :
      matchRanks[4]++;
  }
}

const changeModalNumber = (matchRanks) => {
  const $displayNumber = $$(".match-count");
  const $displayProfit = $(".display-profit");
  let totalReward = 0;
  let investment = lottoTickets.length * 1000;

  $displayNumber.forEach((x, i) => {
    x.innerHTML = matchRanks[i] + "개";
  })
  matchRanks.forEach((x, i) => {
    totalReward += x * lottoRewards[i];
  })
  totalReward = Math.floor((totalReward - investment) / investment * 100)
  console.log(totalReward);
  $displayProfit.innerHTML = `당신의 총 수익률은 ${totalReward}% 입니다.`
}

const restartLottoGame = () => {
  lottoTickets = [];
  $modal.classList.remove('open');
  $topDiv.removeChild($(".inputnum-section"));
  $topDiv.removeChild($(".lotto-section"));
 $("input", $getMoneyForm).value = 0;
}


const init = () => {
  $getMoneyForm.addEventListener("click", getMoneyAmount);
  $modalClose.addEventListener("click", onModalClose)
  $restartBtn.addEventListener("click", restartLottoGame)
}

init();



 
