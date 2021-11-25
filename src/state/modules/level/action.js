import * as types from './types'
import LevelsProxy from '~/services/LevelsProxy'

export const loadLevelAttempt = () => ({
  type: types.LOAD_LEVEL_ATTEMPT
})
export const loadLevelSuccess = (level) => ({
  type: types.LOAD_LEVEL_SUCCESS,
  level
})
export const loadLevelFailure = (error) => ({
  type: types.LOAD_LEVEL_FAILURE,
  error
})
//pasar id
export const loadLevel = (levelId) => async (dispatch) => {
  try {
    dispatch(loadLevelAttempt())
    const levelsProxy = new LevelsProxy()

    const data = await levelsProxy.get(levelId)
    dispatch(loadLevelSuccess(data[0]))
  } catch (error) {
    dispatch(loadLevelFailure(error))
  }
}
