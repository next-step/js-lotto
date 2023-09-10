/*
  - [ ] 로또 구매 -> LottoVendingMachine.purchase
    - [ ] 구입 금액을 입력받는다. 
    - [ ] 구입 금액만큼 로또를 발행한다.
  - [ ] 구매한 로또 목록 확인 -> LottoVendingMachine.lottos (length)
  - [ ] 당첨 번호 및 보너스 번호 지정 -> LottoWinningNumbers({selectedNums, ExtraNum})
  - [ ] 당첨 통계 확인 -> LottoWinningCalculator.calculate()
  - [ ] 게임 재시작 -> retry

  * Controller 에 있는 로직을 별도의 도메인 함수로 분리하면 재사용 가능할 것 같다.
*/

// 뷰를 추상 클래스로 만든다.
// 콘솔 기반에서 쓰이도록 override
// 웹 기반에서 쓰이도록 override
// 컨트롤러는 외부에서 view 를 주입받도록 만들어서 유연성을 업!

import LottoGameController from './js/ui/LottoGameController.js'
import LottoGameViewWeb from './js/ui/LottoGameViewWeb.js'

const main = () => {
  const view = new LottoGameViewWeb()
  new LottoGameController(view).run()
}

main()
