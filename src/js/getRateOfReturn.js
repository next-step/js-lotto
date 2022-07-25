function getRateOfReturn(result) {
  const totalRateOfReturnWinnings =
    result.three.winnings * result.three.count +
    result.four.winnings * result.four.count +
    result.five.winnings * result.five.count +
    result.five_bonus.winnings * result.five_bonus.count +
    result.six.winnings * result.six.count;
  const purchaseInput = document.querySelector('.input-purchase');
  const purchaseValue = purchaseInput.value;

  return (totalRateOfReturnWinnings / purchaseValue) * 100;
}

export default getRateOfReturn;
