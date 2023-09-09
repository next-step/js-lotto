import { debounce } from '../../src/js/utils/debounce'

describe('utils/debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('인자로 넘겨 받은 함수가 한번만 호출되어야 한다.', () => {
    // Given
    const TIME_OUT = 1000
    const callback = jest.fn()
    const fn = debounce(callback, TIME_OUT)

    // When, Then
    fn()
    fn()
    fn()
    expect(callback).not.toBeCalled()

    jest.advanceTimersByTime(TIME_OUT)
    expect(callback).toBeCalledTimes(1)
  })

  it('인자로 넘겨 받은 함수가 올바른 인수로 호출되어야 한다.', () => {
    // Given
    const TIME_OUT = 1000
    const callback = jest.fn()
    const fn = debounce(callback, TIME_OUT)
    const param = 'param'

    // When, Then
    fn(param)
    fn(param)
    fn(param)

    jest.advanceTimersByTime(TIME_OUT)
    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith(param)
  })

  it('타임아웃 인자가 없는 경우, 기본 타임아웃 이후에 호출되어야 한다.', () => {
    // Given
    const callback = jest.fn()
    const fn = debounce(callback)

    // When, Then
    fn()
    fn()
    fn()
    expect(callback).not.toBeCalled()

    jest.advanceTimersByTime(0)
    expect(callback).toBeCalledTimes(1)
  })
})
