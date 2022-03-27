import { selector, selectorAll } from "../utils/consts.js";
import Lotto from "../Lotto.js";
import LottoModal from "./LottoModal.js";

class LottoWinning {
  #lottoWinningNumbersForm;
  #lottoWinningNumberInputs;
  #lottoBonusNumberInput;
  
  setEvent() {
    this.#lottoWinningNumbersForm = selector('form[data-winning-numbers]')
    this.#lottoWinningNumberInputs = [...selectorAll('input[data-winning-numbers]')]

    const bonusNumberIndex = this.#lottoWinningNumberInputs.length - 1
    this.#lottoBonusNumberInput = this.#lottoWinningNumberInputs[bonusNumberIndex]

    this.#lottoWinningNumbersForm.addEventListener('keydown', (event) => {
      const isNumberKeyType = !isNaN(Number(event.key))
  
      if (event.target.value.length >= 2 && isNumberKeyType) {
        event.preventDefault()
        if (event.target && event.target.nextElementSibling) event.target.nextElementSibling.focus()
        else this.#lottoBonusNumberInput.focus()
      }
    })

    this.#lottoWinningNumbersForm.addEventListener('submit', (event) => {
      event.preventDefault()
      console.log(Lotto.validateDuplicateWinningNumber([...this.#lottoWinningNumberInputs].map(tag => tag.value)))
      if (!Lotto.validateWinningNumberRange([...this.#lottoWinningNumberInputs].map(tag => Number(tag.value.length)))) 
        return alert('로또 번호는 1부터 45까지의 숫자만 입력 가능합니다.');

      if (!Lotto.validateDuplicateWinningNumber([...this.#lottoWinningNumberInputs].map(tag => tag.value))) 
        return alert('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
      
        
      
      // new LottoModal()
    })

  }
}

export default LottoWinning;
