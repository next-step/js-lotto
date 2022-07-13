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
const createRandomNums = () => {
  const randomNums = new Set();

  for (let i = 1; i < 6; i++) {
    randomNums.add(
      Math.floor(
        Math.random() * (MAX_LOTTO_NUM - MIN_LOTTO_NUM) + MIN_LOTTO_NUM
      )
    );
  }
  return randomNums;
};

const createTickets = (AMOUNT_OF_LOTTOS) => {
  const templateArray = [];

  for (let i = 0; i < AMOUNT_OF_LOTTOS; i++) {
    const template = `<li class="mx-1 text-4xl lotto-wrapper">
                        <span class="lotto-icon">🎟️ </span>
                        <span class="lotto-detail">${[
                          ...createRandomNums(),
                        ].join(", ")}</span>
                      </li>`;

    templateArray.push(template);
  }
  return templateArray;
};

const displayLottoSection = (priceInput) => {
  const AMOUNT_OF_LOTTOS = priceInput / 1000;
  // 1. <label> 결과 렌더링: n개의 복권 구매
  $lottoSectionLabel.innerText = `총 ${AMOUNT_OF_LOTTOS}개의 복권을 구입했습니다.`;
  // 2. <ul> 복권 생성 및 렌더링
  $lottoTicketsUl.innerHTML = createTickets(AMOUNT_OF_LOTTOS).join("");
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

const toggleNumberDisplay = () => {
  const details = $lottoTicketsUl.querySelectorAll("span.lotto-detail");
  details.forEach((d) => d.classList.toggle("hidden"));
};

const handleToggleClicked = () => {
  toggleNumberDisplay();
};

$priceForm.addEventListener("submit", handleSubmitToShowTheRest);
$lottoSectionToggleInput.addEventListener("click", handleToggleClicked);
