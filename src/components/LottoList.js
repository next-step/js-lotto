class LottoList {
  constructor() {
    this.lottoList = document.getElementById("lottos");
  }

  render(lottos) {
    this.lottoList.innerHTML = "";

    const $countMessage = document.createElement("p");
    $countMessage.textContent = `총 ${lottos.length}개를 구매하였습니다.`;
    $countMessage.classList.add("lotto-count");
    this.lottoList.appendChild($countMessage);

    lottos.forEach((lotto) => {
      const $lottoTicket = document.createElement("div");
      $lottoTicket.classList.add("lotto-ticket");

      const $lottoIcon = document.createElement("span");
      $lottoIcon.textContent = "🎟";

      const lottoNumbers = document.createElement("span");
      lottoNumbers.textContent = lotto
        .getLottoNumbers()
        .map((lottoNumber) => lottoNumber.getValue())
        .join(", ");

      $lottoTicket.appendChild($lottoIcon);
      $lottoTicket.appendChild(lottoNumbers);
      this.lottoList.appendChild($lottoTicket);
    });
  }
}

export default LottoList;
