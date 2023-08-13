import LottoVendingMachine from '../src/js/domain/LottoVendingMachine'

describe('LottoVendingMachine', () => {
  let vendingMachine

  beforeEach(() => {
    // Given
    vendingMachine = new LottoVendingMachine()
  })

  test('구매할 로또 금액을 입력받는다.', () => {
    // When
    vendingMachine.purchase(1000)
    const purchaseAmount = vendingMachine.purchaseAmount

    // Then
    expect(purchaseAmount).toBe(1000)
  })

  test('금액에 맞게 로또 발행을 요청하고, 현재까지 발행된 로또 번호 목록을 기억한다.', () => {
    // When
    vendingMachine.purchase(3000)
    const lottos = vendingMachine.lottos

    // Then
    expect(lottos.length).toBe(3)
  })

  test('로또는 7개의 번호가 한 줄이어야 한다.', () => {
    // When
    vendingMachine.purchase(1000)
    const { selectedNums, extraNum } = vendingMachine.lottos[0]
    const lottos = [...selectedNums, extraNum]

    // Then
    expect(lottos.length).toBe(7)
  })

  describe('- 로또 번호 %s는 1 ~ 45의 범위 이내여야 한다.', () => {
    // Given
    const vendingMachine = new LottoVendingMachine()

    // When
    vendingMachine.purchase(3000)
    const lottos = vendingMachine.lottos.flatMap((lotto) => {
      const { selectedNums, extraNum } = lotto
      return [...selectedNums, extraNum]
    })

    test.each(lottos)('%s', (lotto) => {
      expect(lotto >= 1 && lotto <= 45).toBe(true)
    })
  })

  describe('- 한 줄의 로또를 구매 금액에 맞게 여러번 생성한다.', () => {
    // Given
    const vendingMachine = new LottoVendingMachine()

    test.each([
      [1000, 1],
      [2000, 2],
      [3000, 3],
      [4000, 4],
      [5000, 5],
      [3333, 3],
      [2222, 2],
      [1111, 1],
    ])('구매 금액: %s, 카운트: %s', (amount, count) => {
      // When
      vendingMachine.purchase(amount)
      const lottos = vendingMachine.lottos

      // Then
      expect(lottos.length).toBe(count)
    })
  })

  describe('- 유효하지 않은 금액을 입력시 에러를 출력한다.', () => {
    test.each([-1000, -2000, -1, {}, [], undefined, null, true, false, 999])(
      '.purchase(%s) should throw error',
      (amount) => {
        // Given
        const vendingMachine = new LottoVendingMachine()

        // When
        const wrongPurchase = () => vendingMachine.purchase(amount)

        // Then
        expect(wrongPurchase).toThrow()
      },
    )

    test.each([1000, 2000, 1111])('.purchase(%s) should success', (amount) => {
      // Given
      const vendingMachine = new LottoVendingMachine()

      // When
      const correctPurchase = () => vendingMachine.purchase(amount)

      // Then
      expect(correctPurchase).not.toThrow()
    })
  })
})
