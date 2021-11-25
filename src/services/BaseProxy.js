import axios from 'axios'

export const setAuthorizationHeader = (token = null) => {
  if (token) axios.defaults.headers.common.authorization = `Bearer ${token}`
  else delete axios.defaults.headers.common.authorization
}

export default class BaseProxy {
  constructor() {
    this._baseUrl = `${process.env.REACT_APP_API_URL}/api`
  }

  _makeUrlParams(params) {
    let queryString = ''
    const entries = Object.entries(params)
    for (let i = 0; i < entries.length; ++i) {
      const separator = queryString === '' ? '?' : '&'
      const entry = entries[i]
      if (Array.isArray(entry[1])) {
        for (let j = 0; j < entry[1].length; ++j) {
          queryString += `${separator}${entry[0]}=${entry[1][j]}`
        }
      } else if (entry[1]) {
        queryString += `${separator}${entry[0]}=${entry[1]}`
      }
    }

    return queryString
  }
}
