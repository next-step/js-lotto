import { createLottoTickets, isValidateAmountOfPayment } from "./LottoApp.js";

const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $lottoNumbersToggleButton = document.querySelector(".lotto-numbers-toggle-button");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

// * [확인] 버튼
const $purchaseButton = document.querySelector("#purchaseButton");

// * [확인] 버튼 클릭 시, 구매 금액만큼의 로또 티켓들을 생성한다.
const purchaseLottoTickets = () => {
  const $purchasePrice = Number(document.querySelector("#purchasePrice").value);

  // ! 구입 금액 : 1,000원 단위인지 확인
  if (!isValidateAmountOfPayment($purchasePrice)) {
    document.querySelector("#purchasePrice").value = "";
    return;
  }
  const numberOfLottoTickets = $purchasePrice / 1000;
  const purchasedLottoTickets = createLottoTickets(numberOfLottoTickets);

  // * UI 업데이트 : 구입한 로또 장수 표시
  const $purchasedLottoCount = document.querySelector("#purchasedLottoCount");
  $purchasedLottoCount.innerText = numberOfLottoTickets;

  // * UI 업데이트 : 구입한 로또 장수만큼 로또 아이콘 및 번호
  const $lottoIconAndNumbers = document.querySelector("#lottoIconAndNumbers");

  const lottoTemplate = purchasedLottoTickets
    .map(lotto => {
      return `
        <li class="mx-1 text-4xl lotto-item">
          <span class="lotto-icon">🎟️ </span>
          <span class="lotto-numbers numbers-closed">${lotto.join(", ")}</span>
        </li>
      `;
    })
    .join("");

  $lottoIconAndNumbers.innerHTML = lottoTemplate;

  // * UI 업데이트 : 로또 구매 결과 영역과, 당첨 번호 입력 영역을 사용자에게 보여준다.
  $purchaseResult.style.display = "block";
  $confirmWinningNumbers.style.display = "block";
};

// * [확인] 버튼 - 이벤트 리스너 등록
$purchaseButton.addEventListener("click", purchaseLottoTickets);

//! 페이지 첫 로딩 시에는, 사용자에게 구입 금액을 입력하는 화면만 보여줘야 한다.
//! -> [확인] 버튼을 클릭했을 때 아래 화면이 나타나야 한다.
const $purchaseResult = document.querySelector("#purchaseResult");
$purchaseResult.style.display = "none";

const $confirmWinningNumbers = document.querySelector("#confirmWinningNumbers");
$confirmWinningNumbers.style.display = "none";

// * [번호보기] 토글 : 이벤트 추가
const lottoNumbersToggle = () => {
  // * 로또 번호를 표시한다.
  const lottoNumbers = document.querySelectorAll(".lotto-numbers");
  lottoNumbers.forEach(lottoNumber => {
    lottoNumber.classList.toggle("numbers-closed");
  });

  // * 아이콘과 번호 정렬 상태 변경 (ul) : flex -> block
  const lottoList = document.querySelector(".lotto-list");
  lottoList.classList.toggle("d-flex");

  // * 아이콘과 번호 정렬 상태 변경 (li)
  const lottoListWithNumbers = document.querySelector(".lotto-item");
  lottoListWithNumbers.classList.toggle("lotto-item-with-numbers");
};

$lottoNumbersToggleButton.addEventListener("click", lottoNumbersToggle);
