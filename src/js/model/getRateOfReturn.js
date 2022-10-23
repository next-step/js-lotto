import { price } from '../constants.js';

function getRateOfReturn(result) {
  const totalRateOfReturnWinnings =
    price.winningThree * result.three +
    price.winningFour * result.four +
    price.winningFive * result.five +
    price.winningFiveBouns * result.five_bonus +
    price.winningSix * result.six;
  const purchaseInput = document.querySelector('.purchase-input');
  const purchaseValue = purchaseInput.value;

  return (totalRateOfReturnWinnings / purchaseValue) * 100;
}

export default getRateOfReturn;
