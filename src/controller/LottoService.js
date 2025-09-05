import LottoGenerator from "../domain/LottoGenerator.js";

class LottoService {
  static generateLottos(count) {
    const lottoGenerator = new LottoGenerator();
    return lottoGenerator.issueLottoTicket(count);
  }
}
export default LottoService;
