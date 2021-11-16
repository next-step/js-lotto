const $ = (selector) => document.querySelector(selector);

function App() {
  const lottoTicketsList = [];
  let IsLottoNumberVisible = false;

  const isValidPrice = (price) => {
    if (price === "") {
      alert("금액을 입력해주세요");
      return false;
    }
    if (price < 1000 || 100000 < price) {
      alert("천원 이상 십 만원 이하로 입력해주세요.");
      return false;
    }
    if (price % 1000 !== 0) {
      alert("금액을 천원 단위로 입력해주세요");
      return false;
    }
    return true;
  };

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const showLottoNumbers = () => {
    $(".lotto-tickets")
      .querySelectorAll(".lotto-tickets-numbers")
      .forEach((el) => {
        el.classList.remove("d-none");
        el.classList.add("d-flex");
      });
    IsLottoNumberVisible = false;
  };

  const hideLottoNumbers = () => {
    $(".lotto-tickets")
      .querySelectorAll(".lotto-tickets-numbers")
      .forEach((el) => {
        el.classList.remove("d-flex");
        el.classList.add("d-none");
      });
    IsLottoNumberVisible = true;
  };

  const updateLottoAmounts = (amounts) => {
    $(".lotto__menu").innerHTML = `
      <label class="flex-auto my-0 lotto-amounts"
      >총 ${amounts}개를 구매하였습니다.</label
      >
      <div class="flex-auto d-flex justify-end pr-1">
        <label class="switch">
          <input type="checkbox" class="lotto-numbers-toggle-btn" />
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    `;
  };

  const generateLottoNumbers = (amounts) => {
    for (let i = 0; i < amounts; i++) {
      let newLottoNumbers = [];
      for (let j = 0; j < 6; j++) {
        newLottoNumbers.push(generateRandomNumber(1, 99));
      }
      lottoTicketsList.push(newLottoNumbers);
    }
  };

  const updateLottoTickets = (amounts) => {
    let newLottoTickets = "";
    for (let i = 0; i < amounts; i++) {
      newLottoTickets += `
      <div class='d-flex items-center'>
        <span class="mx-1 text-4xl lotto-tickets-img">🎟️ </span>
        <span class="lotto-tickets-numbers d-none">${lottoTicketsList[i].join(
          ", "
        )}</span>
      </div>
      `;
    }
    $(".lotto-tickets").innerHTML = newLottoTickets;
  };

  const addWinningNumberInput = () => {
    $(".winning-number-input").innerHTML = `
    <label class="flex-auto d-inline-block mb-3"
    >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
      >
      <div class="d-flex">
        <div>
          <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
          <div>
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
            <input
              type="number"
              class="winning-number mx-1 text-center"
            />
          </div>
        </div>
        <div class="bonus-number-container flex-grow">
          <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
          <div class="d-flex justify-center">
            <input type="number" class="bonus-number text-center" />
          </div>
        </div>
      </div>
      <button
        type="button"
        class="open-result-modal-button mt-5 btn btn-cyan w-100"
      >
        결과 확인하기
      </button>
    `;
  };

  const purchaseNewLottos = () => {
    const purchasePrice = $(".purchase__price-input").value;

    // 입력금액 유효성 검사
    if (!isValidPrice(purchasePrice)) {
      return;
    }

    const purchaseAmounts = Math.floor(purchasePrice / 1000);
    generateLottoNumbers(purchaseAmounts);
    updateLottoAmounts(purchaseAmounts);
    updateLottoTickets(purchaseAmounts);
    addWinningNumberInput();
    IsLottoNumberVisible = true;
  };

  $(".purchase__form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $(".purchase__price-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      purchaseNewLottos();
    }
  });

  $(".purchase__confirm-btn").addEventListener("click", (e) => {
    purchaseNewLottos();
  });

  $(".lotto__menu").addEventListener("click", (e) => {
    if (e.target.classList.contains("lotto-numbers-toggle-btn")) {
      IsLottoNumberVisible ? showLottoNumbers() : hideLottoNumbers();
    }
  });
}

App();
