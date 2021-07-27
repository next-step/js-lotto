const calculateWinner = (lottos, winningNumber) => {
  const normalOfWinning = winningNumber.slice(0, 6);
  const bonusOfWinning = winningNumber[6];
  const numberOfWinner = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  lottos.map((lotto) => {
    const normal = lotto.slice(0, 6);
    const bonus = lotto[6];
    let count = 0;
    normal.map((val) => {
      if (normalOfWinning.indexOf(val) !== -1) count += 1;
    });
    if (count === 3) numberOfWinner[5] += 1;
    else if (count === 4) numberOfWinner[4] += 1;
    else if (count === 5 && bonus === bonusOfWinning) numberOfWinner[2] += 1;
    else if (count === 5) numberOfWinner[3] += 1;
    else if (count === 6) numberOfWinner[1] += 1;
  });
  return numberOfWinner;
};

export default calculateWinner;