import * as types from './types'

const initialState = {
  player: null,
  pending: false,
  error: null
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_PLAYER_ATTEMPT:
      return {
        ...state,
        pending: true
      }
    case types.LOAD_PLAYER_SUCCESS:
      return {
        ...state,
        pending: false,
        player: action.player
      }
    case types.LOAD_PLAYER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case types.CREATE_PLAYER_ATTEMPT:
      return {
        ...state,
        pending: true
      }
    case types.CREATE_PLAYER_SUCCESS:
      return {
        ...state,
        pending: false,
        player: action.player
      }
    case types.CREATE_PLAYER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case types.UPDATE_PLAYER_ATTEMPT:
      return {
        ...state,
        pending: true
      }
    case types.UPDATE_PLAYER_SUCCESS:
      return {
        ...state,
        pending: false,
        player: action.player
      }
    case types.UPDATE_PLAYER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case types.DELETE_PLAYER_ATTEMPT:
      return {
        ...state,
        pending: true
      }
    case types.DELETE_PLAYER_SUCCESS:
      return {
        ...state,
        pending: false,
        player: null
      }
    case types.DELETE_PLAYER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}
