/**
 * @param {number} dividend 피제수
 * @param {number} divisor 제수
 * @returns {[number, number]} [몫, 나머지]
 */
export const divmod = (dividend, divisor) => [
	Math.floor(dividend / divisor),
	dividend % divisor,
];
