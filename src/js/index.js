import LottoPaymentForm from "./components/LottoPaymentForm.js";
import LottoResult from "./components/LottoResult.js";
import LottoTickets from "./components/LottoTickets.js";

const lottoPaymentForm = new LottoPaymentForm();
const lottoTickets = new LottoTickets();
const lottoResult = new LottoResult();

lottoPaymentForm.init();
lottoTickets.init();
lottoResult.init();
