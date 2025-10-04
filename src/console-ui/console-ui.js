import {
  purchaseAmountComponent,
  winningLottoNumberComponent,
  bonusNumberComponent,
  winningReportComponent,
} from "./component/index.js";

async function drawLottoUI(store) {
  await purchaseAmountComponent(store);
  await winningLottoNumberComponent(store);
  await bonusNumberComponent(store);
}

async function drawLottoOutputUI(store) {
  await winningReportComponent(store);
}

export { drawLottoUI, drawLottoOutputUI };
