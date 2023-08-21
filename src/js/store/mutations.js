export const mutations = {
  addLotto: (state, { lotto }) => {
    state.lottoList = [...state.lottoList, lotto]
  },
  setCount: (state, { count }) => {
    state.count = count
  },
  setWinNumberList: (state, { winNumberList }) => {
    state.winNumberList = winNumberList
  },
  setBonusNumber: (state, { bonusNumber }) => {
    state.bonusNumber = bonusNumber
  },
  setLottoResult: (state, { lottoResult }) => {
    state.lottoResult = lottoResult
  },
  reset: state => {
    state.count = 0
    state.lottoList = []
    state.winNumberList = []
    state.bonusNumber = null
    state.lottoResult = {
      rate: null,
      stats: []
    }
  }
}
