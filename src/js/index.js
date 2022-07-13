const $priceForm = document.querySelector(".price-form");
const $lottoSection = document.querySelector(".lotto-section");
const $lottoSectionLabel = document.querySelector(".lotto-section__label");
const $lottoSectionToggleInput = document.querySelector(
  ".lotto-section__toggle-input"
);
const $lottoTicketsUl = document.querySelector(".lotto-section__tickets");
const $lottoForm = document.querySelector(".lotto-form");

const MIN_LOTTO_NUM = 1;
const MAX_LOTTO_NUM = 45;

let AMOUNT_OF_LOTTOS = 0;

const ERROR_MESSAGES = {
  REQUIRED_MIN_AMOUNT: "1000원 이상 입력해 주세요!",
  UNIT_ERROR: "1000원 단위로 입력해 주세요!",
};
const validateInput = (validation, err) => {
  if (validation) {
    alert(err);
    return;
  }
};
const handleSubmitToShowTheRest = (e) => {
  e.preventDefault();

  const priceInput = e.target[0].valueAsNumber;

  validateInput(priceInput < 1000, ERROR_MESSAGES.REQUIRED_MIN_AMOUNT);
  validateInput(priceInput % 1000 !== 0, ERROR_MESSAGES.UNIT_ERROR);

  $lottoSection.classList.remove("hidden");
  $lottoForm.classList.remove("hidden");

  displayLottoSection(priceInput);
};

const displayLottoSection = (priceInput) => {
  const AMOUNT_OF_LOTTOS = priceInput / 1000;

  // 1. <label> 결과 알림: n개의 복권 구매
  $lottoSectionLabel.innerText = `총 ${AMOUNT_OF_LOTTOS}개의 복권을 구입했습니다.`;

  // 2. 중복되지 않은 랜덤 넘버 6개 생성

  // const arr = [];
  // // 중복되지 않은 랜덤 넘버 6개 각 <span>에 부여
  // randomNums.forEach((e) => {
  //   arr.push(e);
  // });

  const templateArray = [];

  for (let i = 0; i < AMOUNT_OF_LOTTOS; i++) {
    const randomNums = new Set();

    while (randomNums.size !== 6) {
      randomNums.add(
        Math.floor(
          Math.random() * (MAX_LOTTO_NUM - MIN_LOTTO_NUM) + MIN_LOTTO_NUM
        )
      );
    }

    const template = `<li class="mx-1 text-4xl lotto-wrapper">
                        <span class="lotto-icon">🎟️ </span>
                        <span class="lotto-detail">${[...randomNums].join(
                          ", "
                        )}</span>
                      </li>`;

    templateArray.push(template);
  }

  $lottoTicketsUl.innerHTML = templateArray.join("");

  // 3. 토글
};

//toggle 클릭시 각 티켓별로 랜덤이고 중복되지 않은 번호 6개 보여주기.
const toggleNumberDisplay = () => {
  const details = $lottoTicketsUl.querySelectorAll("span.lotto-detail");
  details.forEach((d) => d.classList.toggle("hidden"));
};

const handleToggleClicked = (e) => {
  if (e.target.checked) {
    // const $lottoTicketNumSpan = document.querySelector(".lotto-detail");
    // const $spanClasses = $lottoTicketNumSpan.classList;
    // $spanClasses.replace("display:inline", "display:none");
    // console.log($spanClasses);
    toggleNumberDisplay();
  }
};

$priceForm.addEventListener("submit", handleSubmitToShowTheRest);
$lottoSectionToggleInput.addEventListener("click", handleToggleClicked);
