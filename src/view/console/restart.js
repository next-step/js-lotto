import { read, startProgram } from "./readline.js";

export const RESTART_MESSAGE = '> 다시 시작하시겠습니까? (y/n)';

export const RESTART_OPTION = {
    YES: 'y',
    NO: 'n'
}

export const restart = async (rl) => {
    
    const yesOrNo = await read(rl, `\n${RESTART_MESSAGE} `);
    const LowerCaseYesOrNo = yesOrNo.toLowerCase();
    if (LowerCaseYesOrNo === RESTART_OPTION.YES) {
        return RESTART_OPTION.YES
    }   
    if (LowerCaseYesOrNo === RESTART_OPTION.NO) {
        return RESTART_OPTION.NO
    }

    return null
}
