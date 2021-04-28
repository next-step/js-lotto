const resetHTML = `
<div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="title text-center">🎱 행운의 로또</h1>
          <div class="input mt-5">
            <label class="mb-2 d-inline-block"
              >구입할 금액을 입력해주세요.
            </label>
            <div class="d-flex">
              <input
                id="price"
                type="number"
                class="w-100 mr-2 pl-2"
                min="0" 
                max="100"
                placeholder="구입 금액"
              />
              <button type="button" class="btn btn-cyan">확인</button>
            </div>
          </div>
          <div class="numbers mt-9">
          </div>
          <div class="result mt-9">
          </div>
        </div>
      </div>
      <div class="modal">
        <div class="modal-inner p-10">
          <div class="modal-close">
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
                  <td id="result3" class="p-3"></td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">4개</td>
                  <td class="p-3">50,000</td>
                  <td id="result4" class="p-3"></td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개</td>
                  <td class="p-3">1,500,000</td>
                  <td id="result5" class="p-3"></td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개 + 보너스볼</td>
                  <td class="p-3">30,000,000</td>
                  <td id="result5b" class="p-3"></td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">6개</td>
                  <td class="p-3">2,000,000,000</td>
                  <td id="result6" class="p-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p id="profit" class="text-center font-bold">당신의 총 수익률은 %입니다.</p>
          <div class="d-flex justify-center mt-5">
            <button id="reset" type="button" class="btn btn-cyan">다시 시작하기</button>
          </div>
        </div>
      </div>
`  

export {resetHTML}
