import { INITIAL_STATE } from './utils/constant.js';
import Subject from './utils/Subject.js';
import { setState } from './store/state.js';

export const subject = new Subject();
setState(INITIAL_STATE);
