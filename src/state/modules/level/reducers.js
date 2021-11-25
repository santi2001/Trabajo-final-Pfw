import * as types from './types'

const initialState = {
  level: { id: '1' },
  pending: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_LEVEL_ATTEMPT:
      return {
        ...state,
        pending: true
      }
    case types.LOAD_LEVEL_SUCCESS:
      return {
        ...state,
        pending: false,
        level: action.level
      }
    case types.LOAD_LEVEL_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}
