import { combineReducers } from 'redux'
import scoreReducer from './scoreReducer'

const reducerWrapper = reducer => (state, action) => {
  return reducer(state, action)
}

export default combineReducers({
  score: reducerWrapper(scoreReducer),
})