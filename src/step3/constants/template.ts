export const NODE_TEMPLATE = {
  LOTTO: (lottoNumbers: string) => `
    <li data-cy="purchased-lotto" class="flex-wrap d-flex items-center purchased-lotto">
      <span data-cy="purchased-lotto-icon" class="mx-1 text-4xl purchased-lotto-icon">🎟️ </span>
      <span data-cy="purchased-lotto-numbers" class="text-xl ml-2 purchased-lotto-numbers">${lottoNumbers}</span>
    </li>
  `,
} as const;
