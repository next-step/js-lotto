import { Lotto } from '../../src/domain/lotto'

describe('로또', () => {
    describe('번호는', () => {
        test('1부터 99까지다.', () => {
            // when, then
            expect(() => new Lotto('1', [1, 10, 20, 30, 40, 99], 99)).not.toThrow();
        })
    })
})