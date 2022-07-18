import { ARRAY_FIRST_INDEX, ARRAY_LAST_INDEX, LOTTO_NUMBER_COUNT, MAX_LOTTO_NUMBER, MIN_PRICE, VALIDATE_TYPE, WINNING_NUMBER_COUNT } from "../constants/index.js";
import { lottos, rankingInfo, winningNumber } from "../store/index.js";
import { validatePrice, validateWinningNumber } from "../validates/index.js";
import { $bonusNumber, $lottoNumbersToggleButton, $modal, $purchaseInputValue,$winningNumbers, addLottoCountLabel, addLottoTickets, hideLottoNumbers, hidePurchaseViewSection, renderRateOfReturn, renderResultTable, showLottoNumbers, showPurchaseViewSection } from "../view/index.js"


const getMatchCounts = (winningLottoNumbers) => {
  const matchCounts = [];
  lottos.forEach((lotto) => {
    matchCounts.push(lotto.filter((number) => winningLottoNumbers.includes(String(number))).length) 
  });

  return matchCounts
}

const calculateLottoRank = (matchCounts, winningBonusNumber) => {
  matchCounts.forEach((count, index) => {
    switch (count) {
      case 3:
        rankingInfo.fifth.count += 1
        break;
      case 4:
        rankingInfo.fourth.count += 1
        break;
      case 5:
        if (lottos[index].includes(Number(winningBonusNumber[ARRAY_FIRST_INDEX]))) {
          rankingInfo.second.count += 1
          break;
        } else {
          rankingInfo.third.count += 1
          break;
        } 
      case 6:
        rankingInfo.first.count += 1
        break;
      default:
        break;
    }
  })
} 

const renderModalContent = () => {
  const winningLottoNumbers = winningNumber.slice(ARRAY_FIRST_INDEX, winningNumber.length -1);
  const winningBonusNumber = winningNumber.slice(ARRAY_LAST_INDEX);
  const rankingInfoValues = Object.values(rankingInfo).reverse();
  const matchCounts = getMatchCounts(winningLottoNumbers);

  calculateLottoRank(matchCounts, winningBonusNumber);
  renderResultTable(rankingInfoValues);
  renderRateOfReturn(rankingInfoValues);
}

export const onModalShow = () => {
  const errorMessage = catchError(VALIDATE_TYPE.WINNING);

  if (errorMessage) {
    alert(errorMessage)
    return
  }

  $modal.classList.add('open')
  
  renderModalContent();
}


export const onModalClose = () => {
  $modal.classList.remove('open')
}

const drawLottoNumbers = () => {
  let lottoNumber = []
  while (lottoNumber.length < LOTTO_NUMBER_COUNT) {
    const number = parseInt(Math.random() * MAX_LOTTO_NUMBER) + 1;
    if (!lottoNumber.includes(number)) {
      lottoNumber.push(number);
    }
  }
  return lottoNumber;
}

const getLottos = (count) => {
  Array.from({ length: count }).forEach(() => {
    const lottoNumber = drawLottoNumbers();
    lottos.push(lottoNumber);
  })
};

const catchError = (type, inputValue) => {
  try {
    if (type === VALIDATE_TYPE.PRICE) {
      validatePrice(inputValue);
    } else {
      validateWinningNumber()
    }
    
  } catch (error) {
    return error;
  }
};

export const handlePurchaseButtonClick = () => {
  const inputValue = $purchaseInputValue.value;
  const lottoCount = inputValue / MIN_PRICE;
  const errorMessage = catchError(VALIDATE_TYPE.PRICE, inputValue);
  
  if (errorMessage) {
    alert(errorMessage)
    return
  }

  getLottos(lottoCount)
  showPurchaseViewSection();
  addLottoCountLabel(lottoCount);
  addLottoTickets(lottos);
}

export const handleLottoNumbersToggleButtonClick = (e) => {
  const isChecked = e.target.checked;
  const lottoNumbers = document.querySelectorAll('div.lotto-numbers');

  if (isChecked) {
    showLottoNumbers(lottoNumbers);
  } else {
    hideLottoNumbers(lottoNumbers);
  }
}

export const getWinningNumbers = (e, index) => {
  winningNumber.splice(index, 1, e.target.value);
}

export const getBonusNumber = (e) => {
  if (winningNumber.length === WINNING_NUMBER_COUNT) {
    winningNumber.splice(ARRAY_LAST_INDEX, 1, e.target.value);
  } else {
    winningNumber.push(e.target.value)
  }
}

const resetPurchaseInputValue = () => {
  $purchaseInputValue.value = '';
}

const resetStore = () => {
  lottos.splice(ARRAY_FIRST_INDEX, lottos.length)
  winningNumber.splice(ARRAY_FIRST_INDEX, winningNumber.length)
  Object.keys(rankingInfo).forEach((value) => {
   rankingInfo[value].count = 0
  })
}

const hideLottoTicketSection = () => {
  const lottoNumbers = document.querySelectorAll('div.lotto-numbers');

  $lottoNumbersToggleButton.checked = false;
  hideLottoNumbers(lottoNumbers);
}

const resetWinningNumbers = () => {
  $winningNumbers.forEach((winningNumber) => {
    winningNumber.value = ''
  })
  $winningNumbers.values('');
  $bonusNumber.value = '';
}

export const handleReset = () => {
  resetPurchaseInputValue();
  resetStore();
  hideLottoTicketSection();
  resetWinningNumbers();
  hidePurchaseViewSection();
  onModalClose();
}