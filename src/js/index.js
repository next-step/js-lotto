import LottoGame from "./domain/LottoGame.js";
import LottoMachine from "./domain/LottoMachine.js";

const $ = (selector) => {
  if (typeof selector === "string") {
    return document.querySelector(selector);
  }

  return null;
};
const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

let purchasableLottosCount = 0;
const $lottoNumbersToggleButton = $(".lotto-numbers-toggle-button");
const $lottoList = $(".lotto-list");

const generateLottoTemplate = (lottoNumbers, hideLottoNumbers) => {
  const lottoNumbersTextContent = lottoNumbers.join(", ");

  return /*HTML*/ `<li class="d-flex items-center">
<span class="mx-1 text-4xl">🎟️ </span>
<span class="lotto-numbers ${
    hideLottoNumbers ? "d-none" : ""
  }">${lottoNumbersTextContent}</span>
</li>`;
};

let lottos = [];

$lottoNumbersToggleButton.addEventListener("click", () => {
  const checked = $lottoNumbersToggleButton.checked;

  if (checked) {
    const lottoListTemplate = lottos.map((lotto) =>
      generateLottoTemplate(lotto.numbers, false)
    );

    $lottoList.innerHTML = lottoListTemplate.join("");

    // add flex-col class to lotto list
    $lottoList.classList.add("flex-col");
  } else {
    // hide lotto numbers
    const lottoListTemplate = lottos.map((lotto) =>
      generateLottoTemplate(lotto.numbers, true)
    );

    $lottoList.innerHTML = lottoListTemplate.join("");

    // remove flex-col class to lotto list
    $lottoList.classList.remove("flex-col");
  }
});

const onPurchaseLotto = () => {
  // get purchase amount from inupt
  const $purchaseAmountInput = $(".purchase-amount-input");
  const purchaseAmount = $purchaseAmountInput.value;

  try {
    purchasableLottosCount = LottoGame.getPurchasableLottoCount(purchaseAmount);

    lottos = generateLottos(purchasableLottosCount);

    // show purchased lottos
    showPurchasedLottos(lottos);

    // show winning lotto form
    showWinningLottoForm();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};

const $purchasedLottosSection = $(".purchased-lottos-section");
const $purchasedLottosCountLabel = $(".purchased-lottos-count-label");

const showPurchasedLottos = (lottos) => {
  // show purchased lotto section
  $purchasedLottosSection.classList.remove("d-none");

  // update purchased lotto count
  const purchasedLottosCountLabelContent = `총 ${lottos.length}개를 구매하였습니다.`;
  $purchasedLottosCountLabel.textContent = purchasedLottosCountLabelContent;

  const lottoListTemplate = lottos.map((lotto) =>
    generateLottoTemplate(lotto.numbers, true)
  );

  $lottoList.innerHTML = lottoListTemplate.join("");
};

const $winningLottoForm = $(".winning-lotto-form");
const showWinningLottoForm = () => {
  $winningLottoForm.classList.remove("d-none");
};

const generateLottos = (lottosCount) => {
  const lottos = [];
  for (let i = 0; i < lottosCount; i++) {
    const lotto = LottoMachine.generateRandomLotto();
    lottos.push(lotto);
  }

  return lottos;
};

const $purchaseButton = $(".purchase-button");
$purchaseButton.addEventListener("click", onPurchaseLotto);

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
