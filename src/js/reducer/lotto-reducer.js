export const INITIAL_LOTTO_STATE = {

}

export const lottoReducer = function (state = INITIAL_LOTTO_STATE, action) {
  if (!action.type) {
    console.error('state 변경을 위한 action 의 type이 지정되지 않았습니다.')
  }
  switch (action.type) {
    default : 
      console.error(`잘못된 action type : ${action.type}`);
      return state;
  }
}