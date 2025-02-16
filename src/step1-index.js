/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoPurchase from "./domain/LottoPurchase.js";
import Input from "./view/Input.js";

const input = new Input();
const purchasePrice = await input.getPurchasePrice();

const lottoPurchase = new LottoPurchase(purchasePrice);
