export default class WinningNumbers {
  constructor({ 
    $targetWinningNumbers
  }) {
    this.$targetWinningNumbers = $targetWinningNumbers;






  }

  render() {
    this.$targetWinningNumbers.classList.remove('hidden');
  }

  setState() {
    this.render(); 
  }
}
