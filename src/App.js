import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage } from '~/views/pages/HomePage'
import { SignInPage, SignUpPage } from '~/views/pages/Auth'
export const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/signin' component={SignInPage} />
      <Route exact path='/signup' component={SignUpPage} />
    </Switch>
  )
}

export default App
