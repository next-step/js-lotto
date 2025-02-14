export const printPurchasedLottos = (lottos) => {
  console.log(`${lottos.length}개를 구매했습니다.`);
  lottos.forEach((numbers) => printLottoNumbers(numbers));
  console.log("");
};

const printLottoNumbers = (lottoNumbers) => {
  console.log(`[${lottoNumbers.join(", ")}]`);
};
