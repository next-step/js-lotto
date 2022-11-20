const $MyLottoInput = document.getElementById('lotto-input');

const inputs = Array.from($MyLottoInput.getElementsByTagName('input'));

const resultButton = $MyLottoInput.getElementsByTagName('button')[0];

inputs.forEach((input, i) => {
  input.setAttribute('required', true);
  input.setAttribute('min', 1);
  input.setAttribute('max', 45);
  input.setAttribute('aria-label', `$lottery-input-${i + 1}`);
  input.addEventListener('keyup', (e) => {
    const value = e.target.value;
    if (value.length > 1) {
      if (i >= inputs.length - 1) {
        resultButton.focus();
        return;
      }

      inputs[i + 1].focus();
    }
  });
});

$MyLottoInput.addEventListener('submit', (e) => {
  e.stopPropagation();
  e.preventDefault();
  console.log('submitted')
});
