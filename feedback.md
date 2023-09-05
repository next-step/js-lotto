## feedback

- "return 구문으로 if-else의 스코프를 줄일 수 있을 것 같습니다!"
  -> 조건에 맞으면, 다음 실행 못하게 return 해주는, 생각하신 의도가 맞는지 궁금합니다.

```js
if (restartOrExitLotto.toLowerCase() !== "y") {
  return rl.close();
} else {
  initializeDataStorage();
  return startLottoGame();
}
```

- "메세지를 다르게 가져가거나, 조건문을 합쳐도 괜찮을 것 같네요!"
  -> 조건문을 합치는 방향으로 정했습니다.

```js
export const validatePositiveNumber = num => {
  if (!isValidNumber(num) || isNaN(num) || num <= 0) {
    throw new Error(ERROR_MESSAGE[VALID_NUMBER_REQUIRED]);
  }

  // if (num <= 0) {
  //   throw Error(ERROR_MESSAGE[VALID_NUMBER_REQUIRED]);
  // }
};
```

- "\_ 접두어는 어떤 의미일까요?"

  > 다른 함수들과 헷갈리지 않게, 파일안에서만 고유하게 쓸 수 있는 함수 컨벤션을 만들어봤습니다.

- "앱 전반에 switch-case 구문이 많이 보이는데, 가독성을 헤치는 주 원인 중 하나로 꼽는 문법입니다. 만약 좀 더 좋게 바꾸려면 어떻게 해야 할까요?"
  -> if/else 보다, 가독성이 좋을 것 같아 switch-case로 접근을 하였으나, 객체로 묶어서 관리하는편이 나을 것 같다고 다시 판단했습니다. 파일을 깔끔하게 쓰기 위해, jsdoc 파일을 분리하였습니다.

  ```js
  /** @typedef {RankPriceFunctions} */
  const RANK_PRICE_STATS = {
    firstWinner: count =>
      `6개 일치 (${LOTTO_PRICE.FIRST_WINNER.toLocaleString()}원) - ${count}개`,
    secondWinner: count =>
      `5개 일치, 보너스 볼 일치 (${LOTTO_PRICE.SECOND_WINNER.toLocaleString()}원) - ${count}개`,
    thirdWinner: count =>
      `5개 일치 (${LOTTO_PRICE.THIRD_WINNER.toLocaleString()}원) - ${count}개`,
    fourthWinner: count =>
      `4개 일치 (${LOTTO_PRICE.FOURTH_WINNER.toLocaleString()}원) - ${count}개`,
    fifthWinner: count =>
      `3개 일치 (${LOTTO_PRICE.FIFTH_WINNER.toLocaleString()}원) - ${count}개`,
  };
  ```
