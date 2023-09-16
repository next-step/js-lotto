import { createSignal } from '../../src/js/utils/createSignal'

describe('utils/createSignal', () => {
  it('초기 값을 인자로 넣는 경우, 초기 값을 읽어야 한다.', () => {
    // Given
    const INITIAL_VALUE = 'initial value'
    const [state] = createSignal(INITIAL_VALUE)

    // When
    const result = state()

    // Then
    expect(result).toBe(INITIAL_VALUE)
  })
  it('값에 대한 읽기, 쓰기를 할 수 있어야 한다.', () => {
    // Given
    const UPDATE_VALUE = 'update value'
    const [value, setValue] = createSignal('')

    // When
    setValue(UPDATE_VALUE)
    const result = value()

    // Then
    expect(result).toBe(UPDATE_VALUE)
  })
})
