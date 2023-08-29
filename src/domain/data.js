export let dataStorage = {
  buyerLottoList: [],
  winNumbers: [],
  bonusNumber: 0,
  lottoStats: {
    firstWinner: 0, // 6
    secondWinner: 0, // 5 + bonus
    thirdWinner: 0, // 5
    fourthWinner: 0, // 4
    fifthWinner: 0, // 3
  },
};

export const initializeDataStorage = () => {
  dataStorage = {
    buyerLottoList: [],
    winNumbers: [],
    bonusNumber: 0,
    lottoStats: {
      firstWinner: 0, // 6
      secondWinner: 0, // 5 + bonus
      thirdWinner: 0, // 5
      fourthWinner: 0, // 4
      fifthWinner: 0, // 3
    },
  };
};
