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
});

export default HTML_FORMAT;
