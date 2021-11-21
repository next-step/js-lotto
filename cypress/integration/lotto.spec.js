/**
 * Commands
 *
 * purchaseLotto: 로또를 구매합니다.
 * clickToggleButton: 로또보기 토글을 클릭합니다.
 * lottoCountShouldBe: 구매한 로또의 개수를 확인합니다.
 * checkLottoDetailDisplay: (visible: boolean) 로또의 번호가 visible인지 확인합니다.
 * typeResultLottoNumber: 지난 주 로또 정답을 입력합니다.
 * getBenefitRate: 결과확인하기를 눌러 수익을 계산합니다.
 * resultShouldBeNull: 결과를 보여주는 모달의 텍스트가 비어있는지 확인합니다.
 * resultShouldBeContainBenefitTemplateText: 결과를 보여주는 모달의 텍스트 템플릿이 잘 들어갔는지 확인합니다.
 * clickResetButton: 다시 시작하기 버튼을 눌러 게임을 다시 시작합니다.
 * lottoInputShouldBeNull: 로또에 입력하는 input이 모두 초기화되었는지 확인합니다.
 * alertMessageWillBeEqual: '인자로 받은 텍스트가 경고창으로 나오는 텍스트와 같은지 확인합니다.'
 */
import lottoConfig from '../../src/js/config/lotto.config'
import {
  MY_LOTTO_LIMIT_ERROR,
  LOTTO_NUMBER_OUT_OF_RANGE_ERROR,
  LOTTO_NUMBER_DUPLICATED_ERROR,
  MANUAL_PURCHASE_PROMPT_VALIDATION_ERROR,
  MANUAL_PURCHASE_PROMPT_NUMBER_OUT_OF_RANGE_ERROR,
  MANUAL_LOTTO_NUMBER_DUPLICATED_ERROR,
  MANUAL_LOTTO_NUMBER_EMPTY_ERROR,
  MANUAL_LOTTO_NUMBER_RANGE_ERROR,
} from '../../src/js/constants/Message'

const LIVE_SERVER_URL = 'http://127.0.0.1:3000/'

describe('로또의 미션의 요구조건을 만족한다.', () => {
  const lottoPrice = lottoConfig.price
  const purchasePrice = 3000
  const validLottoResult = [1, 2, 3, 4, 5, 6, 7]

  beforeEach(() => {
    cy.visit(LIVE_SERVER_URL)
  })

  context('1단계', () => {
    it('로또는 1장에 1000원이고, 금액에 해당하는 로또를 발급한다.', () => {
      cy.autoPurchaseLotto(purchasePrice)
      cy.lottoCountShouldBe(purchasePrice / lottoPrice)
    })

    it('소비자는 자동 구매를 할 수 있어야 하고, 번호보기를 토글하면 볼 수 있어야 한다.', () => {
      cy.autoPurchaseLotto(purchasePrice)
      cy.clickToggleButton()
      cy.checkLottoDetailDisplay(true)
      cy.clickToggleButton()
      cy.checkLottoDetailDisplay(false)
    })

    it('로또의 금액이 나눠떨어지지 않으면 경고창을 표시한다.', () => {
      cy.alertMessageWillBeEqual(lottoPrice + '원 단위로 입력해주세요.')
      cy.autoPurchaseLotto(purchasePrice + 5)
    })
  })

  context('2단계', () => {
    it('결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.', () => {
      cy.resultShouldBeNull()
      cy.autoPurchaseLotto(purchasePrice)
      cy.typeResultLottoNumber(validLottoResult)
      cy.getBenefitRate()
      cy.resultShouldBeContainBenefitTemplateText()
    })

    it('로또를 지정한 개수 이상 구매하면 경고창을 띄워준다.', () => {
      const limitOverPrice = lottoPrice * (lottoConfig.maxMyLottoLimit + 1)

      cy.alertMessageWillBeEqual(MY_LOTTO_LIMIT_ERROR)
      cy.autoPurchaseLotto(limitOverPrice)
    })

    it('입력한 로또 번호가 지정된 범위를 넘어가면 경고창을 띄워준다.', () => {
      const outOfRangeLottoResultNumbers = [1, 2, 3, 4, 5, 6, lottoConfig.maxLottoNumber + 1]

      cy.autoPurchaseLotto(purchasePrice)
      cy.typeResultLottoNumber(outOfRangeLottoResultNumbers)
      cy.alertMessageWillBeEqual(LOTTO_NUMBER_OUT_OF_RANGE_ERROR)
      cy.getBenefitRate()
    })

    it('입력한 로또 번호가 중복된 번호가 있으면 경고창을 띄워준다.', () => {
      const duplicatedLottoNumbers = [1, 2, 3, 4, 5, 6, 6]

      cy.autoPurchaseLotto(purchasePrice)
      cy.typeResultLottoNumber(duplicatedLottoNumbers)
      cy.alertMessageWillBeEqual(LOTTO_NUMBER_DUPLICATED_ERROR)
      cy.getBenefitRate()
    })

    it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
      cy.autoPurchaseLotto(purchasePrice)
      cy.typeResultLottoNumber(validLottoResult)
      cy.getBenefitRate()
      cy.clickResetButton()
      cy.lottoInputShouldBeNull()
    })
  })

  context('3단계', () => {
    it('수동구매 입력창에 문자를 입력할 시 에러를 표시한다.', () => {
      cy.clickToggleManualButton()
      cy.alertMessageWillBeEqual(MANUAL_PURCHASE_PROMPT_VALIDATION_ERROR)
      cy.manualPurchaseLotto({ money: purchasePrice, manualPurchaseAmount: '잘못된 입력' })
    })

    it('수동구매 입력창에 구매한 로또보다 많이 입력할 시 에러를 표시한다.', () => {
      const purchaseOverAmount = 4

      cy.clickToggleManualButton()
      cy.alertMessageWillBeEqual(MANUAL_PURCHASE_PROMPT_NUMBER_OUT_OF_RANGE_ERROR + purchasePrice / lottoPrice + ')')
      cy.manualPurchaseLotto({ money: purchasePrice, manualPurchaseAmount: purchaseOverAmount })
      cy.clickManualPurchaseButton()
    })

    it('수동구매 시 입력창이 비어있을 시 에러를 표시한다.', () => {
      const emptyInputExistLottoNumbers = [[1, 2, 3, 4, 5]]

      cy.clickToggleManualButton()
      cy.alertMessageWillBeEqual(MANUAL_LOTTO_NUMBER_EMPTY_ERROR)
      cy.manualPurchaseLotto({ money: purchasePrice, manualPurchaseAmount: 1 })
      cy.typeManualLottoInputs(emptyInputExistLottoNumbers)
      cy.clickManualPurchaseButton()
    })

    it('수동구매 시 범위를 벗어난 입력창이 있을시 에러를 표시한다.', () => {
      const outOfRangeExistLottoNumbers = [[1, 2, 3, 4, 5, lottoConfig.maxLottoNumber + 1]]

      cy.clickToggleManualButton()
      cy.alertMessageWillBeEqual(MANUAL_LOTTO_NUMBER_RANGE_ERROR)
      cy.manualPurchaseLotto({ money: purchasePrice, manualPurchaseAmount: 1 })
      cy.typeManualLottoInputs(outOfRangeExistLottoNumbers)
      cy.clickManualPurchaseButton()
    })

    it('수동구매 시 중복된 숫자가 있을 시 에러를 표시한다.', () => {
      const duplicatedLottoNumbers = [[1, 2, 3, 4, 4, 5]]

      cy.clickToggleManualButton()
      cy.alertMessageWillBeEqual(MANUAL_LOTTO_NUMBER_DUPLICATED_ERROR)
      cy.manualPurchaseLotto({ money: purchasePrice, manualPurchaseAmount: 1 })
      cy.typeManualLottoInputs(duplicatedLottoNumbers)
      cy.clickManualPurchaseButton()
    })

    it('수동 구매한 로또 번호가 구매한 로또에 포함되어 있고 나머지 로또는 자동구매를 실행한다', () => {
      const manualLottoNumbers = [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
      ]

      cy.clickToggleManualButton()
      cy.manualPurchaseLotto({ money: purchasePrice, manualPurchaseAmount: manualLottoNumbers.length })

      cy.typeManualLottoInputs(manualLottoNumbers)
      cy.clickManualPurchaseButton()

      cy.checkLottoDetailDisplay(false)
      cy.clickToggleButton()

      cy.checkManualLottoNumberPurchased(manualLottoNumbers)
      cy.lottoLengthShouldBeEqual(purchasePrice / lottoPrice)
    })
  })
})
