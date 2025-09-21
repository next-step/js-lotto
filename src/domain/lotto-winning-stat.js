export class LottoWinningStat {

  #matchedCountInfo = new Map();
  #matchedFiveAndBonusCount = 0;

  constructor() {
  }

  Add(matchedCount, bonusNumberMatched) {
    if (matchedCount === 5 && bonusNumberMatched) {
      this.#matchedFiveAndBonusCount += 1;
      return;
    }
    
    const matchedCountValue = this.#matchedCountInfo.get(matchedCount) || 0;
    this.#matchedCountInfo.set(matchedCount, matchedCountValue + 1);
  }

  MatchedCount(count) {
    return this.#matchedCountInfo.get(count) || 0;
  }

  get matchedFiveAndBonusCount() {
    return this.#matchedFiveAndBonusCount;
  }

  Print() {
    console.log('당첨 통계')
    console.log("--------------------")
    this.printMatchedInfo(3);
    this.printMatchedInfo(4);
    this.printMatchedInfo(5);
    this.printBonusMatchedInfo()
    this.printMatchedInfo(6);
  }

  printMatchedInfo(matchedCountTarget) {
    const matchesCount = this.MatchedCount(matchedCountTarget)
    const reward = this.getReward(matchedCountTarget, false)
    console.log(`${matchedCountTarget}개 일치 (${reward}원) - ${matchesCount}개`)
  }

  printBonusMatchedInfo() {
    const reward = this.getReward(5, true);
    console.log(`$5개 일치, 보너스 볼 일치 (${reward}원) - ${this.#matchedFiveAndBonusCount}개`)
  }

  getReward(matchesCount, bonusNumberMatched) {

    if (matchesCount === 5 && bonusNumberMatched) {
      return 30000000;
    }

    let result;

    switch (matchesCount) {
      case 3:
        result = 5000;
        break;
      case 4:
        result = 50000;
        break;
      case 5:
        result = 1500000;
        break;
      case 6:
        result = 2000000000;
        break;
      default:
        result = 0;
        break;
    }

    return result;
  }
}