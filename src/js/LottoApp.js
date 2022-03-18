const LOTTO_LENGTH = 6;

// * 로또 객체 1개를 생성하는 함수
const createLottoTicket = () => {
  const lottoTicket = [];

  for (let i = 0; i < LOTTO_LENGTH; i++) {
    let lottoNumber = Math.floor(Math.random() * 44) + 1;
    let isDuplicateNumber = lottoTicket.includes(lottoNumber);

    while (isDuplicateNumber) {
      lottoNumber = Math.floor(Math.random() * 44) + 1;
      isDuplicateNumber = lottoTicket.includes(lottoNumber);
    }

    lottoTicket.push(lottoNumber);
  }
  return lottoTicket;
};

// * 구매한 갯수만큼 로또 객체를 생성하는 함수
const createLottoTickets = numberOfLottoTickets => {
  const lottoTicketsArray = [];

  for (let i = 0; i < numberOfLottoTickets; i++) {
    lottoTicketsArray.push(createLottoTicket());
  }

  return lottoTicketsArray;
};

// * 구매 금액이 1,000원 단위인지 검증하는 함수
const isValidateAmountOfPayment = payment => {
  if (!(payment % 1000 === 0)) {
    alert("구입 금액은 1,000원 단위로 입력해 주세요.");
    return false;
  }

  return true;
};

export { createLottoTickets, isValidateAmountOfPayment };
