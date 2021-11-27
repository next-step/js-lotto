const initialState = {
  lottoCnt: 0,
  lottoNumberList: [],
  isChecked: false,
};

export default class Lotto {
  constructor({
    $paymentForm,
    $payment,
    $lottoNumberSwitch,
    $confirmBtn,
    $lottoBoard,
    $lottoCnt,
  }) {
    this.$paymentForm = $paymentForm;
    this.$payment = $payment;
    this.$lottoNumberSwitch = $lottoNumberSwitch;
    this.$confirmBtn = $confirmBtn;
    this.$lottoBoard = $lottoBoard;
    this.$lottoCnt = $lottoCnt;
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

  setLottoNum() {
    //state에 로또숫자들을 저장시키는 함수
    this.clearLottoNumber();

    const cnt = this.state.lottoCnt;
    for (let i = 0; i < cnt; i++) {
      const autoNumArr = this.makeAutoLottoNum();
      this.state.lottoNumberList.push(autoNumArr);
    }
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

  clearLottoNumber() {
    //state lottoNumber 초기화
    this.state.lottoNumberList = [];
  }

  clearBoard() {
    //보드를 모두 지워주는 함수
    this.$lottoBoard.innerHTML = "";
  }

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
}
