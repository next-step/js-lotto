export const requestPrice = prompt => {
  prompt.question('구입금액을 입력해 주세요.', price => {
    console.log(Number(price))
  })
}

export const requestWinNumber = prompt => {
  prompt.question('당첨 번호를 입력해 주세요.', winNumber => {
    console.log(winNumber)
  })
}

export const requestBonusNumber = prompt => {
  prompt.question('보너스 번호를 입력해 주세요.', bonusNumber => {
    console.log(bonusNumber)
  })
}

export const requestRetry = prompt => {
  prompt.question('다시 시작하시겠습니까? (y/n)', answer => {
    console.log(answer)
  })
}
