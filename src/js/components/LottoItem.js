export default function LottoItem({ lotto, visible }) {
  const $lottoItem = document.createElement('span');

  const render = () => {
    $lottoItem.classList.add('mx-1');
    $lottoItem.classList.add('text-4xl');
    $lottoItem.innerText = '🎟️';

    const $lottoNumber = document.createElement('span');
    $lottoNumber.classList.add('lotto-number');
    if (visible) $lottoNumber.classList.add('lotto-number--visible');
    $lottoNumber.innerText = `${lotto.join(', ')}`;

    $lottoItem.appendChild($lottoNumber);
  };

  render();
  return $lottoItem;
}
