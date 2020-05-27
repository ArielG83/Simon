import { TOP_SCORE } from '../consts'

const initialState = {
  topTen: [],
}

const scoreReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case TOP_SCORE.GET_TOP_SCORE:
        return {
          ...state,
          topTen: payload,
        }
    case TOP_SCORE.UPDATE_TOP_SCORE:
        return {
          ...state,
          topTen: payload,
        }
    default:
      return state
  }
}

export default scoreReducer
