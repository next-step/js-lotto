import { LottoOperator } from './domain/lotto-operator.js';
import { LottoSeller } from './domain/lotto-seller.js'
import { LottoType } from './domain/lotto-type.js';

const reader = require('readline-sync')

/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

const lottoOperator = new LottoOperator();
const lottoSeller = new LottoSeller(lottoOperator);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let moneyReceived = reader.question('구입금액을 입력해 주세요.');

const lottos = lottoSeller.Sell(LottoType.SIMPLE, moneyReceived);
console.log(`${lottos.length}개를 구매했습니다.`)