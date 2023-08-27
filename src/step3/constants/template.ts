export const NODE_TEMPLATE = {
  LOTTO: (lottoNumbers: string) => `
    <li id="purchased-lotto" class="flex-wrap d-flex items-center">
      <span id="purchased-lotto-icon" class="mx-1 text-4xl">🎟️ </span>
      <span id="purchased-lotto-numbers" class="text-xl ml-2">${lottoNumbers}</span>
    </li>
  `,
} as const;
