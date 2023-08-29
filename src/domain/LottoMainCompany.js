import { dataStorage } from "./data.js";

// LottoMainCompany: winner stats
export const LottoMainCompany = {
  /**
   * @returns {lottoStats} - 당첨 통계 객체
   */
  handleWinnerStats() {
    const lottoLengthList = dataStorage.buyerLottoList.map(lottoList =>
      _handleLottoMatchNumberLength(lottoList, dataStorage.winNumbers)
    );

    lottoLengthList.forEach((match, index) => {
      _handleRankStats(match, dataStorage.buyerLottoList[index]);
    });

    return dataStorage.lottoStats;
  },
};

/**
 * @param {number[]} buyerLottoNumbers
 * @param {number[]} winNumbers
 * @returns {number}
 */
const _handleLottoMatchNumberLength = (buyerLottoNumbers, winNumbers) =>
  buyerLottoNumbers.filter(number => winNumbers.includes(number)).length;

/**
 * @param {number[]} buyerList - 당첨 번호 배열
 * @returns {boolean}
 */
const _hasBonusNumber = buyerList =>
  buyerList.includes(dataStorage.bonusNumber);

/**
 * @param {number} match - 일치하는 숫자 개수
 * @param {number[]} buyerList
 */
const _handleRankStats = (match, buyerList) => {
  switch (match) {
    case 3:
      dataStorage.lottoStats.fifthWinner++;
      break;
    case 4:
      dataStorage.lottoStats.fourthWinner++;
      break;
    case 5:
      !_hasBonusNumber(buyerList)
        ? dataStorage.lottoStats.thirdWinner++
        : dataStorage.lottoStats.secondWinner++;
      break;
    case 6:
      dataStorage.lottoStats.firstWinner++;
      break;
    default:
  }
};
