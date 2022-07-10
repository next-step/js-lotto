/*
필수 요구사항
-[o] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
-[o] 로또 1장의 가격은 1,000원이다.
-[o] 소비자는 자동 구매를 할 수 있어야 한다.
-[o] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

세부 요구사항
# 구입 금액 입력칸
-[o] 구입 금액이 1000원 단위가 아닐 경우 '로또 구입 금액을 1,000원 단위로 입력해 주세요.' 라는 alert가 등장한다.

# 구매 결과

-[o] 로또 구입에 성공하면 구입한 복권 개수 영역, 지난 주 당첨번호를 입력할 수 있는 영역, 결과 확인하기 버튼이 나타난다.
-[o] 로또 번호는 1이상 45이하의 숫자가 랜덤으로 6개 구성된다.

테스트케이스

-[o] 구입 금액이 1000원 단위가 아닐 경우 '로또 구입 금액을 1,000원 단위로 입력해 주세요.' 라는 alert가 등장한다.
-[o] 로또 구입에 성공하면 금액에 해당하는 개수의 로또가 발급된다.
-[o] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

*/

import { $ } from "./utils/dom.js";

function App() {
  this.init = () => {
    initEventListeners();
  };
}

const initEventListeners = () => {
  const onModalShow = () => {
    $(".modal").classList.add("open");
  };

  const onModalClose = () => {
    $(".modal").classList.remove("open");
  };

  const onToggleLotteryDetail = () => {
    let toggleChecked = $(".lotto-numbers-toggle-button").checked;
    let lotteries = document.querySelectorAll(".lottery-number");
    if (toggleChecked) {
      for (let i = 0; i < lotteries.length; i++) {
        lotteries[i].classList.remove("hide");
      }
      $("#lottery-tickets").classList.add("flex-col");
    } else {
      for (let i = 0; i < lotteries.length; i++) {
        lotteries[i].classList.add("hide");
      }
      $("#lottery-tickets").classList.remove("flex-col");
    }
  };
  const randomNumberGenerator = () => {
    return Math.floor(Math.random() * 45 + 1);
  };

  const lottoGenerator = (count) => {
    let template = "";

    while (count--) {
      let lotteryNumbers = "";
      for (let i = 6; i > 0; i--) {
        lotteryNumbers += randomNumberGenerator();
        if (i !== 1) {
          lotteryNumbers += ", ";
        }
      }
      template += `<li class="mx-1 text-4xl">🎟️ <span id=lottery-${count} class="hide lottery-number">${lotteryNumbers}</span></li>`;
    }
    return template;
  };

  const getLotto = () => {
    let lottoCount = $("#input-price").value / 1000;
    $(".lotto-count").innerText = `총 ${lottoCount}개를 구매하였습니다.`;
    $("#lottery-tickets").innerHTML = lottoGenerator(lottoCount);
  };

  const onBuyLotto = () => {
    if ($("#input-price").value % 1000 !== 0 || $("#input-price").value <= 0) {
      alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
      return;
    }
    getLotto();
    $("#after-purchase").classList.remove("hide");
  };
  $(".open-result-modal-button").addEventListener("click", onModalShow);
  $(".modal-close").addEventListener("click", onModalClose);
  $("#buy-lotto-button").addEventListener("click", onBuyLotto);
  $(".lotto-numbers-toggle-button").addEventListener(
    "click",
    onToggleLotteryDetail
  );
};
const app = new App();
app.init();
