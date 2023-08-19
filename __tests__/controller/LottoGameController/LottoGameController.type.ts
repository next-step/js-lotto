import { GameCommandType } from '@step1/constants/controller';

export interface MockInputViewParams {
  investmentAmount?: string;
  winningLottoNumbers?: string;
  bonusNumber?: string;
  gameCommand?: GameCommandType;
}
