export const lottosTemplate = (lottoNumbers) => {
  return lottoNumbers.reduce(
    (prev, curr) =>
      prev +
      `
    <div class="mx-1 text-4xl">
      <span class="lotto-icon">🎟️</span>
      <span class="lotto-numbers">${curr.join(", ")}</span>
    </div>
    `,

    ""
  );
};
