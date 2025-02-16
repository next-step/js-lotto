import { read } from "./readline.js";

export const RESTART_MESSAGE = "> 다시 시작하시겠습니까? (y/n)";

export const RESTART_ERROR_MESSAGE = "정확한 명령어를 입력해주세요 (y/n)";

export const RESTART_OPTION = {
  YES: "y",
  NO: "n",
};

export const restart = async (rl) => {
  const yesOrNo = await read(rl, {
    message: `\n${RESTART_MESSAGE} `,
    errorMessage: RESTART_ERROR_MESSAGE,
    checkPolicy: (val) =>
      val === RESTART_OPTION.YES || val === RESTART_OPTION.NO,
  });
  const LowerCaseYesOrNo = yesOrNo.toLowerCase();
  if (LowerCaseYesOrNo === RESTART_OPTION.YES) {
    return RESTART_OPTION.YES;
  }
  if (LowerCaseYesOrNo === RESTART_OPTION.NO) {
    return RESTART_OPTION.NO;
  }

  return null;
};
