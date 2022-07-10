const $priceForm = document.querySelector(".price-form");
const $priceFormInput = document.querySelector(".price-form__input");
const $lottoSection = document.querySelector(".lotto-section");
const $lottoSectionLabel = document.querySelector(".lotto-section__label");
const $lottoSectionToggleDiv = document.querySelector(".lotto-section__toggle");
const $lottoSectionToggleInput = document.querySelector(
  ".lotto-section__toggle-input"
);
const $lottoTicketsUl = document.querySelector(".lotto-section__tickets");
const $lottoTicketLi = document.querySelector(".lotto-wrapper");
const $lottoTicketNumSpan = document.querySelector(".lotto-detail");
const $lottoForm = document.querySelector(".lotto-form");

const MIN_LOTTO_NUM = 1;
const MAX_LOTTO_NUM = 45;

let AMOUNT_OF_LOTTOS = 0;

const showOtherSections = (e) => {
  e.preventDefault();

  const priceInput = e.target[0].valueAsNumber;

  //만약 입력 금액이 1000원보다 작다면:
  if (priceInput < 1000) {
    alert("1000원 이상 입력해 주세요!");
    return;
  }

  //만약 입력 금액이 1000원 단위가 아니라면:
  if (priceInput % 1000 !== 0) {
    alert("1000원 단위로 입력해 주세요!");
    return;
  }

  $lottoSection.classList.remove("hidden");
  $lottoForm.classList.remove("hidden");

  displayLottoSection(priceInput);
};

const displayLottoSection = (priceInput) => {
  const AMOUNT_OF_LOTTOS = priceInput / 1000;

  // 1. <label> 결과 알림: n개의 복권 구매
  $lottoSectionLabel.innerText = `총 ${AMOUNT_OF_LOTTOS}개의 복권을 구입했습니다.`;

  // 중복되지 않은 랜덤 넘버 6개 생성

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
                        <span class="lotto-detail" style="display:none;">${[
                          ...randomNums,
                        ].join(", ")}</span>
                      </li>`;

    templateArray.push(template);
  }

  $lottoTicketsUl.innerHTML = templateArray.join("");
};

//toggle 클릭시 각 티켓별로 랜덤이고 중복되지 않은 번호 6개 보여주기.
const handleToggleClicked = () => {
  $lottoTicketsUl.classList.add("flex-col");
  $lottoTicketNumSpan.classList.replace(
    'style:"dispaly:none"',
    'style:"display:inline"'
  );
};

$priceForm.addEventListener("submit", showOtherSections);
$lottoSectionToggleInput.addEventListener("click", handleToggleClicked);
