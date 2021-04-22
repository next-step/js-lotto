export const MONEY = {
    MIN : 1000,
    MAX : 100000
}

export const BALL = {
    MIN : 1,
    MAX : 45
}

export const MESSAGE = {
    MONEY_UNIT : "로또 구입 금액을 1,000원 단위로 입력해 주세요.",
    NUM_DUP : "로또 번호에는 중복된 숫자를 입력할 수 없습니다."
}

export const FUNC = {
    checkRange : (val, min, max) => {
        return min <= val && val <= max ? true : false;
    },
    getRandomVal : (val, min, max) => {
        return min <= val && val <= max ? true : false;
    },
    checkDupElement : (ary) => {
        return ary.some((x) => {
            return ary.indexOf(x) !== ary.lastIndexOf(x);
        })
    }
}

export const WIN_NUMBER_SECTION = `<form class="mt-9 inputnum-section" onsubmit="return false;">
<label class="flex-auto d-inline-block mb-3"
  >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
>
<div class="d-flex">
  <div>
    <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
    <div>
      <input type="number" class="winning-number mx-1 text-center" required min="1" max="45">
      <input type="number" class="winning-number mx-1 text-center" required min="1" max="45">
      <input type="number" class="winning-number mx-1 text-center" required min="1" max="45">
      <input type="number" class="winning-number mx-1 text-center" required min="1" max="45">
      <input type="number" class="winning-number mx-1 text-center" required min="1" max="45">
      <input type="number" class="winning-number mx-1 text-center" required min="1" max="45">
    </div>
  </div>
  <div class="bonus-number-container flex-grow">
    <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
    <div class="d-flex justify-center">
      <input type="number" class="bonus-number text-center" required min="1" max="45">
    </div>
  </div>
</div>
<button
  type="submit"
  class="open-result-modal-button mt-5 btn btn-cyan w-100"
>
  결과 확인하기
</button>
</form>`

