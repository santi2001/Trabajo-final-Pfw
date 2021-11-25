import BaseProxy from './BaseProxy'
import axios from 'axios'

export class PlayerProxy extends BaseProxy {
  async get(id) {
    const response = await axios.get(`${this._baseUrl}/player/${id}`)
    return response.data
  }

  async post(player) {
    const response = await axios.post(`${this._baseUrl}/player/`, player)
    return response.data
  }

  async put(player) {
    const response = await axios.put(`${this._baseUrl}/player/${player.idJugadores}`, player)
    return response.data
  }

  async delete(id) {
    const response = await axios.delete(`${this._baseUrl}/player/${id}`)
    return response.data
  }
}

export default PlayerProxy
