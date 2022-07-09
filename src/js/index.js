/*
필수 요구사항
-[ ] 로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
-[ ] 로또 1장의 가격은 1,000원이다.
-[ ] 소비자는 자동 구매를 할 수 있어야 한다.
-[ ] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

세부 요구사항
# 구입 금액 입력칸
-[o] 구입 금액이 1000원 단위가 아닐 경우 '로또 구입 금액을 1,000원 단위로 입력해 주세요.' 라는 alert가 등장한다.
-[ ] 작성한 문자가 한글이면 확인을 누를 경우 값이 초기화된다.
-[ ] 입력 금액이 1000 미만 이라면 '값은 1000 이상이어야 합니다' 라는 required 메시지가 등장한다.

# 구매

-[] 로또 구입에 성공하면 구입한 복권 개수 영역, 지난 주 당첨번호를 입력할 수 있는 영역, 결과 확인하기 버튼이 나타난다.

테스트케이스

-[o] 구입 금액이 1000원 단위가 아닐 경우 '로또 구입 금액을 1,000원 단위로 입력해 주세요.' 라는 alert가 등장한다.
-[] 로또 구입에 성공하면 금액에 해당하는 로또가 발급된다.

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

  const onBuyLotto = () => {
    if ($("#input-price").value % 1000 !== 0 || $("#input-price").value <= 0) {
      alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
      return;
    }
  };
  $(".open-result-modal-button").addEventListener("click", onModalShow);
  $(".modal-close").addEventListener("click", onModalClose);
  $("#buy-lotto-button").addEventListener("click", onBuyLotto);
};
const app = new App();
app.init();
