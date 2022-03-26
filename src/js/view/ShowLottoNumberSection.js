    this.$lottoContainer = $('.lotto-container', this.$target);
    this.isShow = false;
  createOneLotto = () => {
    const lotto = [];
    while (lotto.length !== 6) {
      const randomNumber = this.getLottoNumber();
      if (lotto.includes(randomNumber)) {
        continue;
      }

      lotto.push(randomNumber);
    }

    return lotto;
  };

  getLottoNumber = () => {
    return parseInt(
      Math.random() * (LOTTO_NUMBER_MAX - LOTTO_NUMBER_MIN) + LOTTO_NUMBER_MIN
    );
  };

