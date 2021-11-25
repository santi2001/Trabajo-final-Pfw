import axios from 'axios'
import BaseProxy from './BaseProxy'

export class LevelsProxy extends BaseProxy {
  async get(id) {
    const response = await axios.get(`${this._baseUrl}/level/${id}`)
    return response.data
  }
}

export default LevelsProxy
