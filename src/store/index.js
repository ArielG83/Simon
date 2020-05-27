import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import scoreReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  scoreReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)

export default store