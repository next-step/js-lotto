function Lotto(lotto) {
  const $lotto = document.createElement('li');
  $lotto.classList.add('mx-1', 'text-4xl', 'lotto-wrapper');

  const $icon = document.createElement('span');
  $icon.textContent = '🎟️';

  const $lottoNumbers = document.createElement('span');
  $lottoNumbers.textContent = lotto.join(', ');
  $lottoNumbers.classList.add('lotto-detail');
  $lottoNumbers.classList.add('display-none');

  $lotto.appendChild($icon);
  $lotto.appendChild($lottoNumbers);

  return $lotto;
}

export default Lotto;
