import Lotto from './lotto/lotto.js';
import { readline } from './utils/readline.util.js';

const lotto = new Lotto(readline);

lotto.start();
