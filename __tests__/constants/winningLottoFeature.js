export const ONE_LOTTO_WINNING_RESULT_TEST_CASE = [
  {
    description: 'Test case 1',
    input: {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 7, 9, 10]],
    },
    output: {
      '3개 일치 (5,000원)': 1,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 0,
    },
  },
  {
    description: 'Test case 2',
    input: {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 9, 10]],
    },
    output: {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 1,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 0,
    },
  },
  {
    description: 'Test case 3',
    input: {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 5, 10]],
    },
    output: {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 1,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 0,
    },
  },
  {
    description: 'Test case 4',
    input: {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 5, 7]],
    },
    output: {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 1,
      '6개 일치 (2,000,000,000원)': 0,
    },
  },
  {
    description: 'Test case 5',
    input: {
      investmentAmount: 1000,
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      lottos: [[1, 2, 3, 4, 5, 6]],
    },
    output: {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 1,
    },
  },
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

export const LOTTOS_WINNING_RESULT_TEST_CASE = [
  {
    description: 'Test case 1',
    input: {
      investmentAmount: 5000,
      winningNumbers: [3, 4, 18, 37, 42, 45],
      bonusNumber: 7,
      lottos: [
        [3, 4, 18, 1, 11, 22],
        [7, 4, 18, 37, 2, 22],
        [6, 2, 18, 37, 42, 9],
        [9, 21, 33, 37, 42, 45],
        [3, 29, 18, 1, 42, 5],
      ],
    },
    output: {
      '3개 일치 (5,000원)': 5,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 0,
    },
  },
  {
    description: 'Test case 2',
    input: {
      investmentAmount: 5000,
      winningNumbers: [18, 24, 35, 37, 43, 45],
      bonusNumber: 7,
      lottos: [
        [18, 24, 35, 37, 12, 3],
        [41, 24, 35, 37, 43, 12],
        [20, 11, 35, 37, 43, 45],
        [18, 12, 35, 37, 43, 13],
        [18, 12, 2, 37, 43, 45],
      ],
    },
    output: {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 5,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 0,
    },
  },
  {
    description: 'Test case 3',
    input: {
      investmentAmount: 5000,
      winningNumbers: [4, 18, 22, 24, 26, 45],
      bonusNumber: 7,
      lottos: [
        [4, 18, 22, 24, 23, 45],
        [20, 18, 22, 24, 26, 45],
        [4, 39, 22, 24, 26, 45],
        [4, 18, 28, 24, 26, 45],
        [4, 18, 22, 38, 26, 45],
      ],
    },
    output: {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 5,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 0,
    },
  },
  {
    description: 'Test case 4',
    input: {
      investmentAmount: 5000,
      winningNumbers: [4, 18, 33, 37, 41, 45],
      bonusNumber: 28,
      lottos: [
        [4, 18, 33, 37, 41, 28],
        [28, 18, 33, 37, 41, 45],
        [4, 18, 28, 37, 41, 45],
        [4, 18, 33, 28, 41, 45],
        [4, 18, 33, 37, 28, 45],
      ],
    },
    output: {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 5,
      '6개 일치 (2,000,000,000원)': 0,
    },
  },
  {
    description: 'Test case 5',
    input: {
      investmentAmount: 1000,
      winningNumbers: [8, 12, 17, 25, 30, 34],
      bonusNumber: 7,
      lottos: [[8, 12, 17, 25, 30, 34]],
    },
    output: {
      '3개 일치 (5,000원)': 0,
      '4개 일치 (50,000원)': 0,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
      '6개 일치 (2,000,000,000원)': 1,
    },
  },
  {
    description: 'Test case 6',
    input: {
      investmentAmount: 8000,
      winningNumbers: [2, 14, 16, 24, 32, 36],
      bonusNumber: 7,
      lottos: [
        [2, 14, 16, 21, 30, 44],
        [2, 29, 16, 21, 33, 44],
        [2, 7, 16, 24, 22, 12],
        [7, 14, 16, 24, 32, 22],
        [2, 14, 16, 24, 32, 36],
        [2, 14, 7, 24, 32, 36],
        [2, 29, 16, 24, 32, 5],
        [7, 14, 16, 24, 22, 36],
      ],
    },
    output: {
      '3개 일치 (5,000원)': 2,
      '4개 일치 (50,000원)': 3,
      '5개 일치 (1,500,000원)': 0,
      '5개 일치, 보너스 볼 일치 (30,000,000원)': 1,
      '6개 일치 (2,000,000,000원)': 1,
    },
  },
];

export const LOTTOS_RATE_OF_RETURNS_TEST_CASE = [
  {
    description: 'Test case 1',
    input: {
      investmentAmount: 8000,
      winningNumbers: [3, 4, 18, 25, 42, 45],
      bonusNumber: 7,
      lottos: [[3, 14, 18, 25, 30, 34]],
    },
    output: {
      rateOfReturns: '62.5%',
    },
  },
  {
    description: 'Test case 2',
    input: {
      investmentAmount: 6000,
      winningNumbers: [18, 24, 35, 37, 43, 45],
      bonusNumber: 7,
      lottos: [[18, 24, 35, 37, 12, 3]],
    },
    output: {
      rateOfReturns: '833.3%',
    },
  },
  {
    description: 'Test case 3',
    input: {
      investmentAmount: 14000,
      winningNumbers: [4, 18, 22, 24, 26, 45],
      bonusNumber: 7,
      lottos: [[4, 18, 22, 24, 26, 13]],
    },
    output: {
      rateOfReturns: '10714.3%',
    },
  },
  {
    description: 'Test case 4',
    input: {
      investmentAmount: 2340000,
      winningNumbers: [4, 18, 33, 37, 41, 45],
      bonusNumber: 28,
      lottos: [[4, 18, 33, 37, 41, 28]],
    },
    output: {
      rateOfReturns: '1282.1%',
    },
  },
  {
    description: 'Test case 5',
    input: {
      investmentAmount: 5000,
      winningNumbers: [8, 12, 17, 25, 30, 34],
      bonusNumber: 7,
      lottos: [[8, 12, 17, 33, 22, 11]],
    },
    output: {
      rateOfReturns: '100%',
    },
  },
];
