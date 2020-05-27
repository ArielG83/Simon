import { TOP_SCORE } from '../consts'
import { getData, storeData} from '../../API/asyncStorage'

const getTopScores = () => async dispatch => {
  try {
    const topTen = await getData('topTen')
    dispatch({
      type: TOP_SCORE.GET_TOP_SCORE,
      payload: topTen,
    })
  } catch (error) {
    console.log(error)
  }
}

const updateTopScores = topTen => async dispatch => {
  try {
    await storeData('topTen', topTen)
    dispatch({
      type: TOP_SCORE.UPDATE_TOP_SCORE,
      payload: topTen,
    })
  } catch (error) {
    console.log(error)
  }
}

export {
  getTopScores,
  updateTopScores,
}