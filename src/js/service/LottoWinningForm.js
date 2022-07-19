class LottoWinningForm {
  constructor(lottoWinningNumberForm) {
    this.lottoWinningNumberForm = lottoWinningNumberForm;
  }

  showForm = () => {
    this.lottoWinningNumberForm.classList.add('is-active');
  };

  hiddenForm = () => {
    this.lottoWinningNumberForm.classList.remove('is-active');
  };

  resetForm = () => {
    this.lottoWinningNumberForm.reset();
  };
}

export default LottoWinningForm;
