import * as types from './types'
import PlayerProxy from '~/services/PlayerProxy'

export const loadPlayerAttempt = () => ({
  type: types.LOAD_PLAYER_ATTEMPT
})
export const loadPlayerSuccess = (player) => ({
  type: types.LOAD_PLAYER_SUCCESS,
  player
})
export const loadPlayerFailure = (error) => ({
  type: types.LOAD_PLAYER_FAILURE,
  error
})
export const createPlayerAttempt = () => ({
  type: types.CREATE_PLAYER_ATTEMPT
})

export const createPlayerSuccess = (player) => ({
  type: types.CREATE_PLAYER_SUCCESS,
  player
})
export const createPlayerFailure = (error) => ({
  type: types.CREATE_PLAYER_FAILURE,
  error
})
export const updatePlayerAttempt = () => ({
  type: types.UPDATE_PLAYER_ATTEMPT
})
export const updatePlayerSuccess = (player) => ({
  type: types.UPDATE_PLAYER_SUCCESS,
  player
})
export const updatePlayerFailure = (error) => ({
  type: types.UPDATE_PLAYER_FAILURE,
  error
})
export const deletePlayerAttempt = () => ({
  type: types.DELETE_PLAYER_ATTEMPT
})
export const deletePlayerSuccess = () => ({
  type: types.DELETE_PLAYER_SUCCESS
})
export const deletePlayerFailure = (error) => ({
  type: types.DELETE_PLAYER_FAILURE,
  error
})

//thunks
export const loadPlayer = (id) => async (dispatch) => {
  try {
    dispatch(loadPlayerAttempt())
    const playerProxy = new PlayerProxy()
    const data = await playerProxy.get(id)
    dispatch(loadPlayerSuccess(data[0]))
  } catch (error) {
    dispatch(loadPlayerFailure(error))
  }
}

// nombre, id_niveles, energia
export const createPlayer = (player) => async (dispatch) => {
  try {
    dispatch(createPlayerAttempt())
    console.log(player)
    const playerProxy = new PlayerProxy()
    const data = await playerProxy.post(player)
    dispatch(createPlayerSuccess({ ...player, ...data }))
  } catch (error) {
    dispatch(createPlayerFailure(error))
  }
}

// idJugadores, nombre, id_niveles, energia
export const updatePlayer = (player) => async (dispatch) => {
  try {
    dispatch(updatePlayerAttempt())
    const playerProxy = new PlayerProxy()
    await playerProxy.put(player)
    console.log(player)
    dispatch(updatePlayerSuccess({ ...player }))
  } catch (error) {
    dispatch(updatePlayerFailure(error))
  }
}

export const deletePlayer = (id) => async (dispatch) => {
  try {
    dispatch(deletePlayerAttempt())
    const playerProxy = new PlayerProxy()
    await playerProxy.delete(id)
    dispatch(deletePlayerSuccess())
  } catch (error) {
    dispatch(deletePlayerFailure(error))
  }
}
