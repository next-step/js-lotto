import { $ } from "../shared/consts.js"
import { removeCssToggleWhenResubmitting } from "./util/removeCssToggleWhenResubmitting.js";

import lottoTicket from "./lottoTicket.js"

/**
 * lotto에서 넘겨 준 가격을 통해
 *  1. 유효성 검증을 진행
 *  2. 유효성 검증에 따라 통과되면 하위 ui를 보여준다.
 *  3. 티켓 수량 lottoTicket 함수에 넘겨주기
 *  4. 한번 구입한 상태에서 다시 구입할 때 ui 체크
 */

const $lottoPurchaseInput = $('.lotto-purchase-input');
const tagsShownAccordingToPurchaseStatus = [$('#purchased-lottos'), $('#lotto-winning-numbers-form')]

const checkDisplayWhenResubmitting = () => {
  tagsShownAccordingToPurchaseStatus.map(tag => { 
    if (tag.style.display === "block") tag.style.display = 'none'
  })
}

const passValidatitonLottoPurchaseAmount = amount => {
  amount = Number(amount)

  if (amount < 1000 || amount >= 1000000) {
    checkDisplayWhenResubmitting()
    return false
  }

  if (amount % 1000 !== 0) {
    $lottoPurchaseInput.value = ""
    alert('로또 구입 금액을 1,000원 단위로 입력해 주세요')
    checkDisplayWhenResubmitting()
    return false
  }

  return true
}

const lottoDomain = amount => {
  if (passValidatitonLottoPurchaseAmount(amount)) {
    tagsShownAccordingToPurchaseStatus.map(tag => tag.style.display = "block")
    lottoTicket(amount)
    removeCssToggleWhenResubmitting()
  }
}

export default lottoDomain;
