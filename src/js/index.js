import LottoPaymentForm from "./components/LottoPaymentForm.js";
import LottoResult from "./components/LottoResult.js";
import LottoTickets from "./components/LottoTickets.js";
import LottoResultModal from "./components/LottoResultModal.js";

const lottoPaymentForm = new LottoPaymentForm();
const lottoTickets = new LottoTickets();
const lottoResult = new LottoResult();
const lottoResultModal = new LottoResultModal();

lottoPaymentForm.init();
lottoTickets.init();
lottoResult.init();
lottoResultModal.init();
