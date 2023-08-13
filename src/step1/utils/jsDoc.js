/**
 * "당첨 로또 정보(당첨 로또 번호, 보너스 번호)"에 대한 객체
 * @typedef {Object} WinningLottoInfo
 * @property {number[]} winningLottoNumbers - 당첨 로또 번호
 * @property {number} bonusNumber - 보너스 번호
 */

/**
 * "당첨 횟수, 보너스 번호 일치 여부"에 대한 객체
 * @typedef {Object} LottoMatchingInfo
 * @property {number} winningCount - 당첨 횟수
 * @property {number} hasBonusNumber - 보너스 번호가 일치하는지의 여부
 */

/**
 * "당첨 정보"에 대한 객체
 * @typedef {Object} WinningInfo
 * @property {LottoResult} lottoResult - 로또 당첨 결과
 * @property {string} rateOfReturn - 수익률
 */

/**
 * "로또 당첨 테이블"에 대한 객체
 * @typedef {Object} WinTableEntry
 * @property {string} description - 당첨 조건 설명 (예: '3개 일치 (5,000원)')
 * @property {number} amount - 당첨 금액
 */

/**
 * "로또 당첨 조건 설명 및 당첨 금액"에 대한 Dictionary 형태의 객체
 * @typedef {Object.<string, WinTableEntry>} WinTable
 */

/**
 * "당첨 정보"에 대한 객체
 * @typedef {Object} WinningInfo
 * @property {LottoResult} lottoResult - 로또 당첨 결과
 * @property {number} winningAmount - 당첨 된 총 금액
 */

/**
 * "로또 당첨 조건 - 당첨 횟수"로 이루어진 Dictionary 형태의 객체
 * @typedef {Object.<string, number>} LottoResult
 */

/**
 * 생성할 로또의 최소 번호, 최대 번호, 생성할 로또 갯수에 대한 객체
 * @typedef {Object} LottoRangeInfo
 * @property {number} startNumber - 최소 번호
 * @property {number} endNumber - 최대 번호
 * @property {number} count - 생성할 로또 번호 갯수
 */
