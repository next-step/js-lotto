function checkDuplicatedNumber(numbers) {
  const newNumbers = new Set(numbers);

  if (numbers.length !== newNumbers.size) {
    alert('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
    return;
  } else {
    return true;
  }
}

export default checkDuplicatedNumber;
