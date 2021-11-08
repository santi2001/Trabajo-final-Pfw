import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage } from '~/views/pages/HomePage'
export const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
    </Switch>
  )
}

export default App
