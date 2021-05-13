// 로또 번호 생성기
const autoGenerator = () => {
  const numbers = new Set();
  while (numbers.size < 6) {
    const random = Math.floor(Math.random() * 45) + 1;
    numbers.add(random);
  }
  return [...numbers];
};

export default autoGenerator;
