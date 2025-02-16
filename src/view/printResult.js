const PRINT_LOGIC = {
  1: "6개 일치 (2,000,000,000원)",
  2: "5개 일치, 보너스 볼 일치 (30,000,000원)",
  3: "5개 일치 (1,500,000원)",
  4: "4개 일치 (50,000원)",
  5: "3개 일치 (5,000원)",
};

export const printWinningDetailResult = (winningDetailResult) => {
  console.log("")
  const results = Object.entries(winningDetailResult).map(([key, value]) => {
    console.log(`${PRINT_LOGIC[key]} - ${value}`);
  });
};

export const printRatesOfReturn = (ratesOfReturnValue) => {
  console.log(`\n총 수익률은 ${ratesOfReturnValue}입니다.`)
}