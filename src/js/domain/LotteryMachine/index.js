import Lotto from "../Lotto";
import { RandomIssueStrategy } from "./IssueStrategy";

export default createLotteryMachine = (
  issueStrategy = new RandomIssueStrategy()
) => {
  const issueLotto = () => {
    const lottoNumbers = issueStrategy.getLottoNumbers();
    return Lotto.of(lottoNumbers);
  };

  return {
    issueLotto,
  };
};
