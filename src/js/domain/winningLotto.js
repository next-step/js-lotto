export default function WinningLotto(numbers, bonus) {
  const winningNumbers = new Set(numbers);
  const bonusNumber = bonus;

  this.match = (lotto) => lotto.match([...winningNumbers]);
  this.matchBonus = (lotto) => lotto.matchOne(bonusNumber);
}
