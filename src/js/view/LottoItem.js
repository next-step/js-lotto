export default function LottoItem({ lotto, visible }) {
  const lottoString = lotto.join(', ');
  const lottoNumberClass = visible ? 'lotto-number--visible' : 'lotto-number';

  return `
    <span class="mx-1 text-4xl">
      🎟️ 
      <span class="${lottoNumberClass}">${lottoString}</span>
    </span>
  `;
}
