import { selector } from "../utils/consts.js";
import Lotto from "../Lotto.js";
import LottoTicket from "./LottoTicket.js";

class LottoPurchase {
  
  #lottoPurchaseForm = selector('.lotto-purchase-form');  
  #lottoPurchaseInput = selector('.lotto-purchase-input');
  #ticketContainer;
  #lottoTicketUI;
  #toggle;
  

  setEvent() {
    this.#lottoPurchaseForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const lotto = new Lotto(this.#lottoPurchaseInput.value)
      const amount = lotto.lottoTicketAmount

      this.#lottoTicketUI = [selector('#purchased-lottos'), selector('#lotto-winning-numbers-form')] // 어떻게 이거 피할 수 있을까 (LottoTicket과 중복)
        
      if (!this.isPassValidateAmount(amount)) return;
      
      // 티켓 클래스에 주입
      new LottoTicket(amount)
    })
  }

  isPassValidateAmount(amount) {
    this.#toggle = selector('.lotto-numbers-toggle-button')
    if (!this.changeUIWhenAmountDoNotPassValidation(amount)) return;
    return true
  }
  
  changeUIWhenAmountDoNotPassValidation(amount) {
    if (!amount) {
      this.#lottoPurchaseInput.value = ""
      this.removeCssStyleWhenResubmitting()
      return false
    }
    this.changeCssStyleWhenResubmitting()
    return true
  }

  removeCssStyleWhenResubmitting() {
    if (this.#toggle) {
      this.#toggle.checked = false
      this.#ticketContainer?.classList.remove('flex-col')
      this.#lottoTicketUI.forEach(tag => tag.style.display = "none")
    }
  }

  changeCssStyleWhenResubmitting() {
    if (this.#toggle) {
      this.#toggle.checked = false
      this.#ticketContainer?.classList.remove('flex-col')
    }
  }
}

export default LottoPurchase;
