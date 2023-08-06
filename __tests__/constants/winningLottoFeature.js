export const ONE_LOTTO_WINNING_RESULT_TEST_CASE = [
  [
    {
      '3개 일치 (5,000원)': 1,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 0,
    },
    {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 7, 9, 10]],
    },
  ],
  [
    {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 1,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 0,
    },
    {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 9, 10]],
    },
  ],
  [
    {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 1,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 0,
    },
    {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 5, 10]],
    },
  ],
  [
    {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 1,
      '6개 일치 (2,000,000,000원)': 0,
    },
    {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 5, 7]],
    },
  ],
  [
    {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 1,
    },
    {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 5, 6]],
    },
  ],
];

export const ONE_LOTTO_RATE_OF_RETURNS_TEST_CASE = [
  [
    500,
    {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 7, 9, 10]],
    },
  ],
  [
    5_000,
    {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 9, 10]],
    },
  ],
  [
    150_000,
    {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 5, 10]],
    },
  ],
  [
    3_000_000,
    {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 5, 7]],
    },
  ],
  [
    200_000_000,
    {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 5, 6]],
    },
  ],
];
