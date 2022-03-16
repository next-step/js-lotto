export default class LottoMachine {
  drawLots() {
    const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
    return numbers.sort(() => Math.random() - 0.5).slice(0, 6);
  }
}
