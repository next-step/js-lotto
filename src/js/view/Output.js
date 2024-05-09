import {
  LottoMatchingCountCondition,
  LottoWinningPrice,
  MAX_LOTTO_RANKING,
} from "../../constants/lottoResult";

const Output = {
  printLottoRankingsStatus(lottoRankings) {
    const lottoRankingsStatus = Array(MAX_LOTTO_RANKING + 1).fill(0);

    // 1 ~ 5등에 해당하지 않는 유효하지 않은 등수 제거
    const filteredRankings = lottoRankings.filter(
      (lottoRanking) => lottoRanking > 0
    );

    filteredRankings.forEach((ranking) => {
      lottoRankingsStatus[ranking] += 1;
    });

    console.log("당첨 통계\n--------------------");
    for (let i = MAX_LOTTO_RANKING; i > 0; i--) {
      const template = this.generateLottoRankingsStatusTemplate(
        i,
        lottoRankingsStatus
      );

      console.log(template);
    }
  },

  generateLottoRankingsStatusTemplate(ranking, lottoRankingsStatus) {
    return `${LottoMatchingCountCondition[ranking]}개 일치${
      ranking === 2 ? ", 보너스 볼 일치" : ""
    } (${LottoWinningPrice[ranking].toLocaleString("ko-KR")}원) - ${
      lottoRankingsStatus[ranking]
    }개`;
  },
};

export default Output;
