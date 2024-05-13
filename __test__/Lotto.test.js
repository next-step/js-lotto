import LottoError from "../src/js/common/LottoError.js";
import Lotto from "../src/js/domain/Lotto.js";

test("금액을 입력하면 자동으로 1~45 사이의 숫자를 발행해준다.", () => {
  // TODO 질문하기
});

test("발급된 로또가 1~45 사이의 정수가 아닌 것이 존재하면 오류가 발생한다.", () => {
  // given
  const issueNumbers = [100, 1, 2, 3, 4, 5];

  // when
  // then

  expect(() => {
    new Lotto(issueNumbers);
  }).toThrow(LottoError.LOTTO_NUMBER_OUT_OF_RANGE);
});

test("발급된 로또가 6개가 아니면 오류가 발생한다.", () => {
  // given
  const issueNumbers = [1, 2, 3, 4, 5];

  // when
  // then

  expect(() => {
    new Lotto(issueNumbers);
  }).toThrow(LottoError.LOTTO_LENGTH_ERROR);
});

// test("발급된 로또에 중복이 있으면 오류가 발생한다.", () => {
//   // given
//   const issueNumbers = [1, 1, 3, 4, 5, 6];

//   // when
//   // then

//   expect(() => {
//     new Lotto(issueNumbers);
//   }).toThrow(LottoError.LOTTO_DUPLICATION_NUMBER);
// });
