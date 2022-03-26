import {range} from '../../../../src/js/lib/range.js';

describe('range()', () => {
	it('인자 하나만 전달하는 경우, 0이상 인자 미만의 범위를 리턴한다', () => {
		expect([...range(1)]).to.deep.equal([0]);
		expect([...range(10)]).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	});

	it('인자 두 개를 전달하는 경우, 첫 번째 인자 이상 두 번째 인자 미만의 범위를 리턴한다', () => {
		expect([...range(2, 8)]).to.deep.equal([2, 3, 4, 5, 6, 7]);
		expect([...range(6, 10)]).to.deep.equal([6, 7, 8, 9]);
	});

	it('인자 세 개를 전달하는 경우, 첫 번째 인자 이상 두 번째 인자 미만의 세 번째 인자 간격의 범위를 리턴한다', () => {
		expect([...range(2, 8, 2)]).to.deep.equal([2, 4, 6]);
		expect([...range(6, 12, 3)]).to.deep.equal([6, 9]);
	});
});
