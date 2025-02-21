class OutputView {
  static printLottoCount(lottoCount) {
    console.log(`${lottoCount}개를 구매했습니다.`);
  }

  static printLottos(lottos) {
    for (const lotto of lottos) {
      const lottoNumbers = lotto
        .getLottoNumbers()
        .map((lottoNumber) => lottoNumber.getValue());
      console.log(lottoNumbers.join(","));
    }
  }

  printError(errorMessage) {
    console.log(errorMessage);
  }
}

export default OutputView;
