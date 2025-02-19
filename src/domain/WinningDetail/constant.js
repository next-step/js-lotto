import { WINNING_KEY, WINNING_CONDITION_KEY } from "./rule.js";

const lookupWinners = (ticketResult, bonusNumber) => {
  const ticketLength = ticketResult.length;
  const hasBonusNumber = ticketResult.includes(bonusNumber);
  const WINNERS_TYPE = {
    [!hasBonusNumber && WINNING_CONDITION_KEY.FIRST_AND_SECOND]:
      WINNING_KEY.FIRST,
    [hasBonusNumber && WINNING_CONDITION_KEY.FIRST_AND_SECOND]:
      WINNING_KEY.SECOND,
    [WINNING_CONDITION_KEY.THIRD]: WINNING_KEY.THIRD,
    [WINNING_CONDITION_KEY.FOURTH]: WINNING_KEY.FOURTH,
    [WINNING_CONDITION_KEY.FIFTH]: WINNING_KEY.FIFTH,
  };

  return WINNERS_TYPE[ticketLength] || WINNING_KEY.OTHER;
};

export default lookupWinners;
