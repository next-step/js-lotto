const HTML_FORMAT = Object.freeze({
  PURCHASE_INFO: (amount) => `
    <div class="d-flex purchase-info" >
      <label class="flex-auto my-0">총 ${amount}개를 구매하였습니다.</label>
      <div class="flex-auto d-flex justify-end pr-1 switch-box">
        <label class="switch">
          <input type="checkbox" />
          <span class="text-base font-normal">번호보기</span>
        </label>
      </div>
    </div>
`,
  LOTTO_BOX: (tickets) => `
  <div class="d-none flex-col lotto-box" >
    ${tickets
      .map(
        (ticket) =>
          `
    <div class="flex-auto lotto-ticket">
      <span class="mx-1 text-lg">🎟️</span>
      ${ticket
        .map((number) => `<span class="mx-1 text-sm number">${number}</span>`)
        .join("")}
    </div>`,
      )
      .join("")}
  </div>
  `,
  PRIZE_FORMAT: (totalPrize) => `
  ${totalPrize
    .map(
      (prize) => `<tr class="text-center">
                  <td class="p-3">${
                    prize.requiresBonusNumber
                      ? `${prize.matchingNumberCount}개+보너스볼`
                      : `${prize.matchingNumberCount}개`
                  }</td>
                  <td class="p-3">${prize.prizeAmount.toLocaleString("en")}</td>
                  <td class="p-3">${prize.count}개</td>
                </tr>`,
    )
    .join("")}
  `,
  PROFIT_RATIO: (profitRatio) => {
    const profitPercent = profitRatio * 100;

    return `당신의 총 수익률은 ${
      Number.isInteger(profitPercent) ? profitPercent : profitPercent.toFixed(1)
    }%입니다.`;
  },
  WINNING_NUMBER_INPUTS: (length) =>
    `${Array.from(
      { length },
      (_, index) => `
          <input
            type="number"
            class="winning-number mx-1 text-center"
            data-index="${index}"
          />`,
    ).join("")}`,
});

export default HTML_FORMAT;
