class LottoWinningForm {
  constructor(lottoWinningNumberForm) {
    this.lottoWinningNumberForm = lottoWinningNumberForm;
  }

  showForm = () => {
    this.lottoWinningNumberForm.classList.add('is-active');
  };
}

export default LottoWinningForm;
