function createLottoNumber() {
  const result = [...Array(6)].map((num) => {
    const randomNumber = Math.floor(Math.random() * 45 + 1);

    return randomNumber;
  });

  return result;
}
export default createLottoNumber;
