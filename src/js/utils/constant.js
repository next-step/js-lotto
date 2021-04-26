const $ = (selector) => document.querySelector(selector)
const $All = (selector) => document.querySelectorAll(selector)

const app = `<div id="app" class="p-3">
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
           <form class="mt-5">
            <label class="mb-2 d-inline-block"
              >구입할 금액을 입력해주세요.
            </label>
            <div class="d-flex">
              <input
                type="number"
                class="w-100 mr-2 pl-2"
                placeholder="구입 금액"
              />
              <button type="button" id="payBtn" class="btn btn-cyan">확인</button>
            </div>
          </form>
        </div>
      </div>
</div>`


const appBuySection = (num)=>`
          <section class="mt-9">
            <div class="d-flex">
              <label class="flex-auto my-0">총 ${num}개를 구매하였습니다.</label>
              <div class="flex-auto d-flex justify-end pr-1">
                <label class="switch">
                  <input type="checkbox" class="lotto-numbers-toggle-button" />
                  <span class="text-base font-normal" id="seeNum">번호보기</span>
                </label>
              </div>
            </div>
            <div class="d-flex flex-wrap" id="lotteImageTitle">
            </div>
          </section>`

const lotteImage = (n1,n2,n3,n4,n5,n6)=> `<span class="mx-1 text-4xl" id="lotteImage">🎟️ <span id="lotteNumber" style="display:none">${n1},${n2},${n3},${n4},${n5},${n6}</span> </span>`

const inputLastWeekNumber = `<form class="mt-9">
            <label class="flex-auto d-inline-block mb-3"
              >지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.</label
            >
            <div class="d-flex">
              <div>
                <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
                <div>
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                    value="1"
                  />
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                    value="2"
                  />
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                    value="3"
                  />
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                    value="4"
                  />
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                    value="5"
                  />
                  <input
                    type="number"
                    class="winning-number mx-1 text-center"
                    value="6"
                  />
                </div>
              </div>
              <div class="bonus-number-container flex-grow">
                <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
                <div class="d-flex justify-center">
                  <input type="number" class="bonus-number text-center"                   value="7"/>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="open-result-modal-button mt-5 btn btn-cyan w-100"
            >
              결과 확인하기
            </button>
          </form>`

const alertMessage ={
  winningOverNum : '당첨번호 값은 1이상 45이하이어야한다.',
  bonusOverNum : '보너스번호 값은 1이상 45이하이어야한다.',
  duplicationNum : '중복된 숫자는 불가능하다.',
  numInTheThousands : '천의자리만 가능하다'
}

const winStatics =(three,four,five,fiveBonus,six)=> ` <div class="modal">
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
                  <td class="p-3">${three}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">4개</td>
                  <td class="p-3">50,000</td>
                  <td class="p-3">${four}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개</td>
                  <td class="p-3">1,500,000</td>
                  <td class="p-3">${five}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개 + 보너스볼</td>
                  <td class="p-3">30,000,000</td>
                  <td class="p-3">${fiveBonus}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">6개</td>
                  <td class="p-3">2,000,000,000</td>
                  <td class="p-3">${six}개</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-center font-bold">당신의 총 수익률은 %입니다.</p>
          <div class="d-flex justify-center mt-5">
            <button type="button" class="btn btn-cyan">다시 시작하기</button>
          </div>
        </div>
      </div>`

export {$,$All,app,lotteImage,appBuySection,inputLastWeekNumber,alertMessage,winStatics}
