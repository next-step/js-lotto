function checkDuplicatedNumber(numbers) {
  const newNumbers = new Set(numbers);

  if (numbers.length !== newNumbers.size) {
    throw new Error('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
  }
}

export default checkDuplicatedNumber;
