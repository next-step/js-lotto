const parseTable = (table, lottoCount) => {
  let cnt = 0;
  const parsedResult = [];
  const parsing = {
    3: { title: "3개", price: "5000원" },
    4: { title: "4개", price: "50,000원" },
    5: { title: "5개", price: "1,500,000원" },
    "5b": { title: "5개 + 보너스볼", price: "30,000,000원" },
    6: { title: "6개", price: "2,000,000,000원" },
  };
  for (let result in table) {
    const info = parsing[result];
    info["number"] = table[result];
    parsedResult.push(info);
    cnt += table[result];
  }

  return { result: parsedResult, rate: (cnt / lottoCount) * 100 };
};

const lottoCheck = (lottoList, winningNumbers) => {
  const table = {
    3: 0,
    4: 0,
    5: 0,
    "5b": 0,
    6: 0,
  };
  lottoList.forEach((list) => {
    let winCount = 0;
    list.forEach((number) => {
      if (winningNumbers.indexOf(number) !== -1) winCount++;
    });
    if (winCount === 6) {
      if (list.indexOf(winningNumbers[6]) !== -1) table["5b"]++;
      else table[6]++;
    } else if (winCount >= 3) {
      table[winCount]++;
    }
  });

  return parseTable(table, lottoList.length);
};

export default lottoCheck;
