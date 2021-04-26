export const TEMPLATE = {
  INPUT_MONEY: () => (`
            <h1 class="text-center">🎱 행운의 로또</h1>
            <label class="mb-2 d-inline-block"
              >구입할 금액을 입력해주세요.
            </label>
            <div class="d-flex">
              <input
                type="number"
                class="w-100 mr-2 pl-2"
                placeholder="구입 금액"
                min="1000"
                max="100000"
              />
              <button type="submit" class="btn btn-cyan">확인</button>
            </div>
  `),
  CHECK_LOTTO: (num) => {
    return `
              <label class="flex-auto my-0">총 ${num}개를 구매하였습니다.</label>
              <div class="flex-auto d-flex justify-end pr-1">
                <label class="switch">
                  <input type="checkbox" class="lotto-numbers-toggle-button" />
                  <span class="text-base font-normal">번호보기</span>
                </label>
              </div>`

  },
  LOTTO_NUMBER: (nums) => {
    return `
      <span class="lotto-icon">🎟️ </span>
      <span class="lotto-detail hidden">${nums.join(',')}</span>
    `
  },
  INPUT_LAST_NUMBER: () => {
    return `
            <label class="flex-auto d-inline-block mb-3"
              >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
            >
            <div class="d-flex">
              <div>
                <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                <div>
                  <input
                    type="number"
                    required
                    min="0"
                    max="45"
                    name="number"
                    class="winning-number mx-1 text-center"
                  />
                  <input
                    type="number"
                    required
                    min="0"
                    max="45"
                    name="number"
                    class="winning-number mx-1 text-center"
                  />
                  <input
                    type="number"
                    required
                    min="0"
                    max="45"
                    name="number"
                    class="winning-number mx-1 text-center"
                  />
                  <input
                    type="number"
                    required
                    min="0"
                    max="45"
                    name="number"
                    class="winning-number mx-1 text-center"
                  />
                  <input
                    type="number"
                    required
                    min="0"
                    max="45"
                    name="number"
                    class="winning-number mx-1 text-center"
                  />
                  <input
                    type="number"
                    required
                    min="0"
                    max="45"
                    name="number"
                    class="winning-number mx-1 text-center"
                  />
                </div>
              </div>
              <div class="bonus-number-container flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                  <input name="bonus"
                    required
                    min="0"
                    max="45" 
                  type="number" 
                  class="bonus-number text-center" />
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="open-result-modal-button mt-5 btn btn-cyan w-100"
            >
              결과 확인하기
            </button>
          `
  },

  INPUT_LAST_NUMBER1: ({
    first = 0,
    second = 0,
    third = 0,
    fourth = 0,
    fifth = 0
  }) => {

    return `  
        <div class="modal-inner p-10">
          <div class="modal-close close">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </div>

          <h2 class="text-center">🏆 당첨 통계 🏆</h2>
          <div class="d-flex justify-center">
            <table class="result-table border-collapse border border-black">
              <thead>
                <tr class="text-center">
                  <th class="p-3">일치 갯수</th>
                  <th class="p-3">당첨금</th>
                  <th class="p-3">당첨 갯수</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center">
                  <td class="p-3">3개</td>
                  <td class="p-3">5,000</td>
                  <td class="p-3">${fifth}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">4개</td>
                  <td class="p-3">50,000</td>
                  <td class="p-3">${fourth}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개</td>
                  <td class="p-3">1,500,000</td>
                  <td class="p-3">${third}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개 + 보너스볼</td>
                  <td class="p-3">30,000,000</td>
                  <td class="p-3">${second}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">6개</td>
                  <td class="p-3">2,000,000,000</td>
                  <td class="p-3">${first}개</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-center font-bold">당신의 총 수익률은 %입니다.</p>
          <div class="d-flex justify-center mt-5">
            <button type="button" class="btn btn-cyan restart">다시 시작하기</button>
          </div>
        </div>
      `

  }

}


