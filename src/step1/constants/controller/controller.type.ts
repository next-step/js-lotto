import { GAME_PROMPT } from '@step1/constants/controller';

export type GameCommandType = (typeof GAME_PROMPT)[keyof typeof GAME_PROMPT];
