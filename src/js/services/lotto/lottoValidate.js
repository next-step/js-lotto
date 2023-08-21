import { isNumber, isInRange } from '../../utils/validator'

export const isInLottoRange = num => isInRange(num, 1, 45)

export const checkBonusNumber = (bonusNumber, winNumberList) => {
  if (!isNumber(bonusNumber)) {
    throw new Error('⚠️ 보너스 번호는 숫자로만 입력해야 합니다! ⚠️\n')
  }

  if (!isInLottoRange(bonusNumber)) {
    throw new Error(
      '⚠️ 보너스 번호는 1부터 45 이하로만 입력이 가능합니다! ⚠️\n'
    )
  }

  if (winNumberList.includes(bonusNumber)) {
    throw new Error(
      '⚠️ 보너스 번호는 당첨 번호에 없는 숫자로만 입력해야 합니다! ⚠️\n'
    )
  }
}

export const checkValidWinNumberList = winNumberText => {
  const winNumberList = winNumberText.split(',').map(num => Number(num))
  const uniqueWinNumberList = new Set(winNumberList)

  const isValidType = winNumberList.every(num => isNumber(num))
  if (!isValidType) {
    throw new Error('⚠️ 딩첨 번호는 숫자로만 입력해야 합니다! ⚠️\n')
  }

  if (uniqueWinNumberList.size !== 6) {
    throw new Error('⚠️ 당첨 번호는 중복 없이 6개를 입력해야 합니다! ⚠️\n')
  }

  const hasValidNumber = winNumberList.every(isInLottoRange)
  if (!hasValidNumber) {
    throw new Error('⚠️ 당첨 번호는 1부터 45 이하로만 입력이 가능합니다! ⚠️\n')
  }
}
