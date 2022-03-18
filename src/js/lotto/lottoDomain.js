import { $, WARNING_WHEN_NOT_IN_1000_UNITS } from "../shared/consts.js"
import { removeCssToggleWhenResubmitting } from "./util/removeCssToggleWhenResubmitting.js";

import lottoTicket from "./lottoTicket.js"

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

    alert(WARNING_WHEN_NOT_IN_1000_UNITS)
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
