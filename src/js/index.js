import { $ } from "./utils/dom.js";
import { MAX_LOTTO_NUM } from "./utils/constant.js";

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
    const toggleChecked = $(".lotto-numbers-toggle-button").checked;
    const lotteries = document.querySelectorAll(".lottery-number");

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
    return Math.floor(Math.random() * MAX_LOTTO_NUM + 1);
  };

  const lottoTemplateGenerator = (lotteryNumbers) => {
    return `<li class="mx-1 text-4xl"><span class="ticket-paint">🎟️ </span><span id=lottery-${0} class="hide lottery-number">${[
      ...lotteryNumbers,
    ].join(",")}</span></li>`;
  };

  const lottoNumberGenerator = () => {
    const lotteryNumbers = new Set();

    while (lotteryNumbers.size < 6) {
      lotteryNumbers.add(randomNumberGenerator());
    }

    return [...lotteryNumbers];
  };

  const lottoGenerator = (count) => {
    return Array.from({ length: count })
      .map(() => lottoTemplateGenerator(lottoNumberGenerator()))
      .join("");
  };

  const getLotto = (purchaseValue) => {
    const lottoCount = purchaseValue / 1000;

    $(".lotto-count").innerText = `총 ${lottoCount}개를 구매하였습니다.`;
    $("#lottery-tickets").innerHTML = lottoGenerator(lottoCount);
  };

  const onBuyLotto = (event) => {
    event.preventDefault();

    const purchaseValue = event.target[0].valueAsNumber;

    if (purchaseValue % 1000 !== 0 || purchaseValue <= 0) {
      alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
      return;
    }

    getLotto(purchaseValue);

    $("#after-purchase").classList.remove("hide");
  };

  $(".open-result-modal-button").addEventListener("click", onModalShow);
  $(".modal-close").addEventListener("click", onModalClose);

  $("#lotto-purchase-form").addEventListener("submit", onBuyLotto);

  $(".lotto-numbers-toggle-button").addEventListener(
    "click",
    onToggleLotteryDetail
  );
};
const app = new App();
app.init();
