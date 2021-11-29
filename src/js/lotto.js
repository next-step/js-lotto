const initialState = {
  lottoCnt: 0,
  lottoNumberList: [],
  winningNumberList: [],
  bonusNumber: null,
  matchNumberList: [
    {
      name: "3개",
      amount: 5000,
      cnt: 0,
    },
    {
      name: "4개",
      amount: 50000,
      cnt: 0,
    },
    {
      name: "5개",
      amount: 1500000,
      cnt: 0,
    },
    {
      name: "5개 + 보너스볼",
      amount: 30000000,
      cnt: 0,
    },
    {
      name: "6개",
      amount: 2000000000,
      cnt: 0,
    },
  ],
  isChecked: false,
  profit: 0,
  profitRate: 0,
};

export default class Lotto {
  constructor({
    $paymentForm,
    $payment,
    $lottoNumberSwitch,
    $confirmBtn,
    $lottoBoard,
    $lottoCnt,
    $modal,
    $modalClose,
    $resultButton,
    $winningNumbers,
    $bonusNumber,
    $profitRateText,
    $resetBtn,
    $resultBoard,
  }) {
    this.$paymentForm = $paymentForm;
    this.$payment = $payment;
    this.$lottoNumberSwitch = $lottoNumberSwitch;
    this.$confirmBtn = $confirmBtn;
    this.$lottoBoard = $lottoBoard;
    this.$lottoCnt = $lottoCnt;
    this.$modal = $modal;
    this.$modalClose = $modalClose;
    this.$resultButton = $resultButton;
    this.$resultBoard = $resultBoard;
    this.$winningNumbers = $winningNumbers;
    this.$bonusNumber = $bonusNumber;
    this.$profitRateText = $profitRateText;
    this.$resetBtn = $resetBtn;
    this.state = initialState;
  }

  bindEvents() {
    this.$paymentForm.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
      }.bind(this)
    );
    this.$confirmBtn.addEventListener(
      "click",
      this.onClickConfirmBtn.bind(this)
    );
    this.$lottoNumberSwitch.addEventListener(
      "click",
      this.onClickToggleBtn.bind(this)
    );
    this.$resultButton.addEventListener("click", this.onModalShow.bind(this));
    this.$modalClose.addEventListener("click", this.onModalClose.bind(this));
    this.$resetBtn.addEventListener("click", this.onClickResetBtn.bind(this));
  }

  makeNumberString(numberArr) {
    //숫자 템플릿을 만드는 함수 ex) '1, 31, 4, 27, 44, 2'
    let numberString = "";
    const maxIdx = 5;
    numberArr.forEach((number, idx) => {
      if (idx === maxIdx) numberString += number;
      else numberString += `${number},`;
    });
    return numberString;
  }

  makeAutoLottoNum() {
    //로또 한 장에 대한 자동으로 숫자 6자리를 만들어내는 함수
    let result = [];
    let randomCnt = 0; //<-랜덤카운팅이 6까지 일때 while문을 돌릴 것이다.
    while (randomCnt < 6) {
      //한장 당 만들 수 있는 랜덤숫자갯수가 6개까지이므로 6까지 만들 것임.
      const random_1_45 = Math.ceil(Math.random() * 45);
      if (result.includes(random_1_45)) continue;
      result.push(random_1_45);
      randomCnt++;
    }
    return result;
  }

  makeLottoNumberTemp() {
    //로또숫자를 보여주는 템플릿을 만드는 함수
    let temp = "";
    const lottoCnt = this.state.lottoCnt; //로또갯수
    for (let i = 0; i < lottoCnt; i++) {
      const numberString = this.makeNumberString(this.state.lottoNumberList[i]);
      temp += `
      <li class="mx-1 text-4xl lotto-wrapper">
        <span class="lotto-icon">🎟️ </span>
        <span class="lotto-detail" style="display: inline;">${numberString}</span>
      </li>
    `;
    }
    return temp;
  }

  makeResultTemp() {
    console.log(this.state.matchNumberList);
    const basicTemp = this.state.matchNumberList.reduce(
      (prev, cur) =>
        (prev += `<tr class="text-center">
        <td class="p-3">${cur.name}</td>
        <td class="p-3">${cur.amount}</td>
        <td class="p-3">${cur.cnt}개</td>
        </tr>`),
      ""
    );
    return basicTemp;
  }

  setLottoNum() {
    //state에 로또숫자들을 state에 저장시키는 함수
    this.clearLottoNumber();

    const cnt = this.state.lottoCnt;
    for (let i = 0; i < cnt; i++) {
      const autoNumArr = this.makeAutoLottoNum();
      this.state.lottoNumberList.push(autoNumArr);
    }
  }

  setLottoOfficialResult() {
    //로또당첨정보를 state에 주입하는 함수
    let winningNumbers = [];
    for (let i of this.$winningNumbers) {
      winningNumbers.push(Number(i.value));
    }
    this.state.winningNumberList = winningNumbers;
    this.state.bonusNumber = Number(this.$bonusNumber.value);
    this.setLottoResult();
  }

  setLottoResult() {
    //당첨번호정보와 구입한 로또번호를 비교한 값을 state에 주입하는 함수

    this.clearMatchNumberList();
    this.state.lottoNumberList.forEach((numbers) => {
      const isMatchBonus = numbers.includes(this.state.bonusNumber);
      const matchWinningNumberCnt = this.state.winningNumberList.reduce(
        (prev, cur) => {
          numbers.includes(cur) && prev++;
          return prev;
        },
        0
      );
      console.log(matchWinningNumberCnt);
      switch (matchWinningNumberCnt) {
        case 6:
          this.state.matchNumberList = this.state.matchNumberList.map((ele) => {
            this.state.profit += parseInt(ele.amount);
            return ele.name === "6개" ? { ...ele, cnt: ele.cnt + 1 } : ele;
          });
          break;
        case 5:
          if (isMatchBonus) {
            this.state.matchNumberList = this.state.matchNumberList.map(
              (ele) => {
                this.state.profit += parseInt(ele.amount);
                return ele.name === "5개 + 보너스볼"
                  ? { ...ele, cnt: ele.cnt + 1 }
                  : ele;
              }
            );
          }
          if (!isMatchBonus) {
            this.state.matchNumberList = this.state.matchNumberList.map(
              (ele) => {
                this.state.profit += parseInt(ele.amount);
                return ele.name === "5개" ? { ...ele, cnt: ele.cnt + 1 } : ele;
              }
            );
          }
          break;
        case 4:
          this.state.matchNumberList = this.state.matchNumberList.map((ele) => {
            this.state.profit += parseInt(ele.amount);
            return ele.name === "4개" ? { ...ele, cnt: ele.cnt + 1 } : ele;
          });
          break;
        case 3:
          this.state.matchNumberList = this.state.matchNumberList.map((ele) => {
            this.state.profit += parseInt(ele.amount);
            return ele.name === "3개" ? { ...ele, cnt: ele.cnt + 1 } : ele;
          });
          break;
        default:
          this.state.matchNumberList = this.state.matchNumberList;
      }
    });
    this.setProfitRate();
    this.showResult();
  }

  setProfitRate() {
    //수익률을 구하고, state에 저장하는 함수
    this.state.profitRate =
      ((this.state.profit - this.$payment.value) / this.$payment.value) * 100;
    this.showProfitRate();
  }

  onClickToggleBtn(e) {
    //번호보기버튼 스위치
    const isChecked = e.target.checked;
    if (isChecked) {
      this.state.isChecked = true;
      this.showLottoNumber();
      this.$lottoBoard.classList.add("flex-col");
      return;
    }
    this.state.isChecked = false;
    this.showLotto();
    this.$lottoBoard.classList.remove("flex-col");
  }

  onClickConfirmBtn() {
    //지불액에 따라 로또를 구입하는 함수
    const payment = Number(this.$payment.value);
    const lottoPrice = 1000;
    const numberOfPurchase = Math.trunc(payment / lottoPrice);
    this.state.lottoCnt = numberOfPurchase;
    this.setLottoNum();
    this.showLotto();
  }

  onClickResetBtn() {
    location.reload();
  }

  onModalShow = () => {
    this.$modal.classList.add("open");
    this.setLottoOfficialResult();
  };

  onModalClose = () => {
    this.$modal.classList.remove("open");
  };

  showLottoNumber() {
    this.clearBoard();

    const htmlTemp = this.makeLottoNumberTemp();
    this.$lottoBoard.innerHTML = htmlTemp;
  }

  showLotto() {
    // 렌더링 해야 할 html :  <span class="mx-1 text-4xl">🎟️ </span>
    this.clearBoard();

    const cnt = this.state.lottoCnt;

    //로또를 구입한 갯수만큼 node 추가하여 화면에 렌더링
    for (let i = 0; i < cnt; i++) {
      const newSpan = document.createElement("span");
      newSpan.classList.add("mx-1", "text-4xl");
      newSpan.innerText = "🎟️ ";
      this.$lottoBoard.appendChild(newSpan);
    }

    //로또를 구입한 갯수 렌더링
    const cntTemp = `총 ${cnt}개를 구매하였습니다.`;
    this.$lottoCnt.innerText = cntTemp;
  }

  showResult() {
    const temp = this.makeResultTemp();
    this.$resultBoard.innerHTML = temp;
  }

  showProfitRate() {
    if (this.state.profitRate)
      this.$profitRateText.innerText = `당신의 총 수익률은 ${this.state.profitRate}%입니다.`;
  }

  clearLottoNumber() {
    //state lottoNumber 초기화
    this.state.lottoNumberList = [];
  }

  clearBoard() {
    //보드를 모두 지워주는 함수
    this.$lottoBoard.innerHTML = "";
  }

  clearMatchNumberList() {
    this.state.matchNumberList = [
      {
        name: "3개",
        amount: 5000,
        cnt: 0,
      },
      {
        name: "4개",
        amount: 50000,
        cnt: 0,
      },
      {
        name: "5개",
        amount: 1500000,
        cnt: 0,
      },
      {
        name: "5개 + 보너스볼",
        amount: 30000000,
        cnt: 0,
      },
      {
        name: "6개",
        amount: 2000000000,
        cnt: 0,
      },
    ];
  }
}
