export default function Lotto(numbers) {
  const lottoNumbers = new Set(numbers);

  this.getLottoNumbers = () => [...lottoNumbers];
  this.match = (matchNumbers) =>
    matchNumbers.filter((number) => lottoNumbers.has(number)).length;
  this.matchOne = (number) => lottoNumbers.has(number);
}
