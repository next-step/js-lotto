const initialState = {
  lottoCnt: 0,
};

export default class Lotto {
  constructor({
    $paymentForm,
    $payment,
    $lottoNumbersToggleButton,
    $confirmBtn,
    $renderLotto,
    $lottoCnt,
  }) {
    this.$paymentForm = $paymentForm;
    this.$payment = $payment;
    this.$lottoNumberSwitch = $lottoNumbersToggleButton;
    this.$confirmBtn = $confirmBtn;
    this.$renderLotto = $renderLotto;
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
      this.onConfirmBtnClick.bind(this)
    );
    this.$lottoNumberSwitch.addEventListener(
      "click",
      this.onClickToggleBtn.bind(this)
    );
  }

  onClickToggleBtn(e) {
    const isChecked = e.target.checked;
  }

  onConfirmBtnClick() {
    const payment = Number(this.$payment.value);
    const lottoPrice = 1000;
    const numberOfPurchase = Math.trunc(payment / lottoPrice);
    this.state.lottoCnt = numberOfPurchase;
    this.renderLotto();
  }

  renderLotto() {
    // <span class="mx-1 text-4xl">🎟️ </span>
    const cnt = this.state.lottoCnt;
    this.$renderLotto.innerHTML = ""; //초기화

    //로또를 구입한 갯수만큼 node 추가
    for (let i = 0; i < cnt; i++) {
      const newSpan = document.createElement("span");
      newSpan.classList.add("mx-1", "text-4xl");
      newSpan.innerText = "🎟️ ";
      this.$renderLotto.appendChild(newSpan);
    }

    //로또를 구입한 갯수 렌더링
    const cntTemp = `총 ${cnt}개를 구매하였습니다.`;
    this.$lottoCnt.innerText = cntTemp;
  }
}
