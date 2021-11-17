import lottoConfig from '../config/lotto.config'

export default Object.freeze({
  myLottoLimitError: `로또는 ${lottoConfig.maxMyLottoLimit}개 까지 구매할 수 있습니다.`,
  lottoNumberOutOfRangeError: `로또 번호는 1번부터 ${lottoConfig.maxLottoNumber}까지 입력 할 수 있습니다.`,
  lottoNumberDuplicateError: '중복된 로또 번호가 있습니다.',
})
